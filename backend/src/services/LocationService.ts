import { prisma } from "../prisma";

interface Location {
  name: string;
  customerId: number;
}

export class LocationService {

  async create({name, customerId}: Location) {
    return await prisma.location.create({
      data: {
        name, customer: { connect: { id: customerId } }
      },
      include: { customer: true }
    });
  }

  async findAll() {
    return await prisma.location.findMany({
      include: { customer: true }
    });
  }

  async findBydId(id: number) {
    const location = await prisma.location.findFirst({
      where: { id },
      include: { customer: true }
    });
    return location;
  }

  async update(id: number, { name, customerId }: Location) {
    return await prisma.location.update({
      where: { id },
      data: {
        name, customer: { connect: { id: customerId } }
      },
      include: { customer: true }
    });
  }

  async deleteOne(id: number) {
    try {
      await prisma.location.delete({
        where: { id }
      });
    } catch {
      throw new Error('Location do not removed!')
    }
  }

}