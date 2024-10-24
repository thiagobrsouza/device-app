import { prisma } from "../prisma";

interface Customer {
  name: string;
}

export class CustomerService {

  async create({name}: Customer) {
    const exists = await prisma.customer.findFirst({
      where: { name }
    });
    if (exists) {
      throw new Error('Customer already exists!');
    }
    return await prisma.customer.create({
      data: { name }
    });
  }

  async findAll() {
    return await prisma.customer.findMany();
  }

  async findBydId(id: number) {
    const customer = await prisma.customer.findFirst({
      where: { id }
    });
    return customer;
  }

  async update(id: number, {name}: Customer) {
    const customer = await prisma.customer.findFirst({
      where: { id }
    });
    const exists = await prisma.customer.findFirst({
      where: { name }
    });
    if (exists && exists.id !== customer?.id) {
      throw new Error('Customer already exists!');
    }
    return await prisma.customer.update({
      where: { id },
      data: { name }
    });
  }

  async deleteOne(id: number) {
    try {
      await prisma.customer.delete({
        where: { id }
      });
    } catch {
      throw new Error('Customer do not removed!')
    }
  }

}