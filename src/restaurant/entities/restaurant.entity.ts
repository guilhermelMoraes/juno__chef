import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Restaurant from '../restaurant.model';
import HoursOfOperationEntity from './hours-of-operation.entity';

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

  @OneToMany(() => HoursOfOperationEntity, (ho) => ho.restaurant)
  hoursOfOperation!: HoursOfOperationEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}

export default RestaurantEntity;
