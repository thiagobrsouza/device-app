import { Request, Response, Router } from "express";
import { CustomerService } from "../services/CustomerService";

const service = new CustomerService();
const customerRoute = Router();

customerRoute.post('/customers',
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const result = await service.create({ name });
    return res.status(201).json(result);
  }
);

customerRoute.get('/customers',
  async (req: Request, res: Response) => {
    const result = await service.findAll();
    return res.json(result);
  }
);

customerRoute.get('/customers/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await service.findBydId(+id);
    return res.json(result);
  }
);

customerRoute.patch('/customers/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const result = await service.update(+id, { name });
    return res.json(result);
  }
);

customerRoute.delete('/customers/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await service.deleteOne(+id);
    return res.json(result);
  }
);

export { customerRoute }