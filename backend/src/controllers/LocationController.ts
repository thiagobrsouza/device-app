import { Request, Response, Router } from "express";
import { LocationService } from "../services/LocationService";

const service = new LocationService();
const locationRoute = Router();

locationRoute.post('/locations',
  async (req: Request, res: Response) => {
    const { name, customerId } = req.body;
    const result = await service.create({ name, customerId });
    return res.status(201).json(result);
  }
);

locationRoute.get('/locations',
  async (req: Request, res: Response) => {
    const result = await service.findAll();
    return res.json(result);
  }
);

locationRoute.get('/locations/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await service.findBydId(+id);
    return res.json(result);
  }
);

locationRoute.patch('/locations/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, customerId } = req.body;
    const result = await service.update(+id, { name, customerId });
    return res.json(result);
  }
);

locationRoute.delete('/locations/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await service.deleteOne(+id);
    return res.json(result);
  }
);

export { locationRoute }