import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDonationSchema, insertRequestSchema } from "@shared/schema";
import { findNearestRequest } from "./lib/matching";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/donations - Get all donations
  app.get("/api/donations", async (req, res) => {
    try {
      const donations = await storage.getAllDonations();
      res.json(donations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch donations" });
    }
  });

  // POST /api/donations - Create a new donation and match with nearest request
  app.post("/api/donations", async (req, res) => {
    try {
      // Validate request body
      const validationResult = insertDonationSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          message: "Invalid donation data",
          errors: validationResult.error.errors,
        });
      }

      // Create the donation
      const donation = await storage.createDonation(validationResult.data);

      // Find nearest active request within 5km
      const activeRequests = await storage.getActiveRequests();
      const match = findNearestRequest(
        donation.latitude,
        donation.longitude,
        activeRequests,
        5
      );

      let responseData: any = { donation };

      if (match) {
        // Update donation status to assigned and link to matched request
        const updatedDonation = await storage.updateDonationStatus(
          donation.id,
          "assigned",
          match.request.id
        );

        // Mark the matched request as fulfilled so it's not matched again
        await storage.updateRequestStatus(match.request.id, "fulfilled");

        responseData = {
          donation: updatedDonation,
          match: {
            name: match.request.organizationName,
            distance: match.distance,
            eta: match.eta,
            address: match.request.address,
            contact: match.request.contactNumber,
          },
        };
      }

      res.status(201).json(responseData);
    } catch (error) {
      console.error("Error creating donation:", error);
      res.status(500).json({ message: "Failed to create donation" });
    }
  });

  // GET /api/requests - Get active requests only (default safe behavior)
  app.get("/api/requests", async (req, res) => {
    try {
      const requests = await storage.getActiveRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch requests" });
    }
  });

  // POST /api/requests - Create a new food request
  app.post("/api/requests", async (req, res) => {
    try {
      // Validate request body
      const validationResult = insertRequestSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          message: "Invalid request data",
          errors: validationResult.error.errors,
        });
      }

      // Create the request
      const request = await storage.createRequest(validationResult.data);

      res.status(201).json(request);
    } catch (error) {
      console.error("Error creating request:", error);
      res.status(500).json({ message: "Failed to create request" });
    }
  });

  // GET /api/requests/active - Get active requests (for matching)
  app.get("/api/requests/active", async (req, res) => {
    try {
      const activeRequests = await storage.getActiveRequests();
      res.json(activeRequests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch active requests" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
