import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModule: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const productCreated = await this.productModule.create(createProductDto);
      return productCreated;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAll() {
    try {
      const products = await this.productModule.find();
      return products;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productModule.findOne({ _id: id });
      return product;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      await this.productModule.findByIdAndUpdate(id, updateProductDto);
      const updatedProduct = await this.productModule.findById(id);
      return updatedProduct;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async remove(id: string) {
    try {
      const deletedProduct = await this.productModule.findByIdAndRemove(id);
      return deletedProduct;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
