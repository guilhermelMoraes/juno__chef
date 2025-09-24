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
