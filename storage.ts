import { type Donation, type InsertDonation, type Request, type InsertRequest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Donations
  createDonation(donation: InsertDonation): Promise<Donation>;
  getDonation(id: string): Promise<Donation | undefined>;
  getAllDonations(): Promise<Donation[]>;
  updateDonationStatus(id: string, status: string, matchedRequestId?: string): Promise<Donation | undefined>;
  
  // Requests
  createRequest(request: InsertRequest): Promise<Request>;
  getRequest(id: string): Promise<Request | undefined>;
  getAllRequests(): Promise<Request[]>;
  updateRequestStatus(id: string, status: string): Promise<Request | undefined>;
  getActiveRequests(): Promise<Request[]>;
}

export class MemStorage implements IStorage {
  private donations: Map<string, Donation>;
  private requests: Map<string, Request>;

  constructor() {
    this.donations = new Map();
    this.requests = new Map();
    this.seedInitialData();
  }

  private seedInitialData() {
    // Seed some sample data for testing
    const sampleRequests: InsertRequest[] = [
      {
        organizationName: "Hope Community Shelter",
        requirementType: "Cooked meals",
        quantityRequired: "50 servings/day",
        address: "123 Main St, Downtown",
        latitude: 40.7589,
        longitude: -73.9851,
        contactNumber: "+1-555-0101",
      },
      {
        organizationName: "City Food Bank",
        requirementType: "Fresh produce and packaged food",
        quantityRequired: "100kg daily",
        address: "456 Oak Ave, Midtown",
        latitude: 40.7489,
        longitude: -73.9651,
        contactNumber: "+1-555-0102",
      },
      {
        organizationName: "Sunrise Shelter",
        requirementType: "Any food donations",
        quantityRequired: "30-40 meals",
        address: "789 Pine Rd, Uptown",
        latitude: 40.7789,
        longitude: -73.9551,
        contactNumber: "+1-555-0103",
      },
    ];

    sampleRequests.forEach((reqData) => {
      const id = randomUUID();
      const request: Request = {
        ...reqData,
        id,
        status: "active",
        createdAt: new Date(),
      };
      this.requests.set(id, request);
    });
  }

  // Donations
  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = randomUUID();
    const donation: Donation = {
      ...insertDonation,
      id,
      status: "pending",
      matchedRequestId: null,
      createdAt: new Date(),
    };
    this.donations.set(id, donation);
    return donation;
  }

  async getDonation(id: string): Promise<Donation | undefined> {
    return this.donations.get(id);
  }

  async getAllDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async updateDonationStatus(
    id: string,
    status: string,
    matchedRequestId?: string
  ): Promise<Donation | undefined> {
    const donation = this.donations.get(id);
    if (donation) {
      donation.status = status;
      if (matchedRequestId) {
        donation.matchedRequestId = matchedRequestId;
      }
      this.donations.set(id, donation);
      return donation;
    }
    return undefined;
  }

  // Requests
  async createRequest(insertRequest: InsertRequest): Promise<Request> {
    const id = randomUUID();
    const request: Request = {
      ...insertRequest,
      id,
      status: "active",
      createdAt: new Date(),
    };
    this.requests.set(id, request);
    return request;
  }

  async getRequest(id: string): Promise<Request | undefined> {
    return this.requests.get(id);
  }

  async getAllRequests(): Promise<Request[]> {
    return Array.from(this.requests.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async updateRequestStatus(id: string, status: string): Promise<Request | undefined> {
    const request = this.requests.get(id);
    if (request) {
      request.status = status;
      this.requests.set(id, request);
      return request;
    }
    return undefined;
  }

  async getActiveRequests(): Promise<Request[]> {
    return Array.from(this.requests.values())
      .filter((r) => r.status === "active")
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
}

export const storage = new MemStorage();
