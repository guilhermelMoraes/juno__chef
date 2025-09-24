import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import HoursOfOperationEntity from './hours-of-operation.entity';
import Restaurant from '../../restaurant.model';

// prettier-ignore
@Entity('restaurants')
class RestaurantEntity implements Omit<Restaurant, 'hoursOfOperation' | 'address'> {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

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
  description?: string;

  @Column({
    type: 'varchar',
    length: 15,
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
  })
  website?: string;

  @OneToMany(() => HoursOfOperationEntity, (ho) => ho.restaurant, { cascade: true })
  hoursOfOperation!: HoursOfOperationEntity[];

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
