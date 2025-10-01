import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IRestaurant } from '../restaurant.model';
import AddressEntity from './address.entity';
import OpenFromEntity from './open-from.entity';

interface IRestaurantEntity extends Omit<IRestaurant, 'address'> {
  openFrom: OpenFromEntity[];
}

// prettier-ignore
@Entity('restaurants')
class RestaurantEntity implements IRestaurantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 700,
    nullable: true,
  })
  description: string | undefined;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  phone!: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  cnpj!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  owner!: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
    nullable: true,
  })
  website: string | undefined;

  @OneToOne(() => AddressEntity, (address) => address.restaurant)
  address!: AddressEntity

  @OneToMany(() => OpenFromEntity, (ho) => ho.restaurant, { cascade: true })
  openFrom!: OpenFromEntity[];

  @CreateDateColumn({
    select: false,
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    select: false,
    name: 'updated_at',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    select: false,
    name: 'deleted_at',
  })
  deletedAt!: Date;
}

export default RestaurantEntity;
