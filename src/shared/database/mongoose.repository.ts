import { Document, Model, FilterQuery, UpdateQuery } from "mongoose";

export abstract class MongooseRepository<M extends Document, E> {
  constructor(protected readonly mongooseModel: Model<M>) {}

  async createAndSave(createEntity: Partial<E>): Promise<E> {
    try {
      const newEntity = new this.mongooseModel(createEntity);
      const savedEntity = await newEntity.save();
      return savedEntity.toObject();
    } catch (err) {
      throw err;
    }
  }

  async count<M>(filter?: FilterQuery<M>): Promise<number> {
    try {
      const res = await this.mongooseModel.count(filter);
      return res;
    } catch (err) {
      throw err;
    }
  }

  async find(
    filter?: FilterQuery<M> | null,
    projection?: Record<string, number> | null,
  ): Promise<E[] | null> {
    try {
      const res = await this.mongooseModel.find(filter, { ...projection });
      return res.map((e) => e.toObject());
    } catch (err) {
      throw err;
    }
  }

  async findOne(
    filter?: FilterQuery<M> | null,
    projection?: Record<string, number> | null,
  ): Promise<E | null> {
    try {
      const res = await this.mongooseModel.findOne(filter, { ...projection });
      return res === null ? null : res.toObject();
    } catch (err) {
      throw err;
    }
  }

  async findOneAndUpdate(
    filter: FilterQuery<M>,
    updateEntity: UpdateQuery<M>,
  ): Promise<E | null> {
    // Partial stands for partial properties of a class type
    try {
      const res = await this.mongooseModel.findOneAndUpdate(
        filter,
        updateEntity,
        { new: true },
      );
      return res === null ? null : res.toObject();
    } catch (err) {
      throw err;
    }
  }
  async delete(filter: FilterQuery<M>): Promise<boolean> {
    try {
      const deletedEntity = await this.mongooseModel.deleteMany(filter);
      return deletedEntity.deletedCount >= 1;
    } catch (err) {
      throw err;
    }
  }
  async findAllWithPagination(
    limit: number,
    page: number,
    filter?: FilterQuery<M> | null,
    projection?: Record<string, number> | null,
  ): Promise<{
    queries: string;
    cur_page: number;
    total_pages: number;
    total_entity: number;
    entities: E[] | null;
  }> {
    try {
      const total: number = await this.mongooseModel.count(filter);
      const pages: number = Math.ceil(total / limit);
      const skip: number = (page - 1) * limit;
      const res = await this.mongooseModel
        .find(filter, { ...projection })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      return {
        queries: "limit: number, page: number",
        cur_page: page,
        total_pages: pages,
        total_entity: total,
        entities: res.map((e) => e.toObject()),
      };
    } catch (err) {
      throw err;
    }
  }
  //abstract createEntityWithoutSaving(entity: unknown): T
  //abstract saveCreatedEntity(entity: unknown): Promise<T>
}
