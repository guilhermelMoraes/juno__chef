import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IHoursOfOperation } from '../value-objects/hours-of-operation.value-object';
import RestaurantEntity from './restaurant.entity';

@Entity('hours_of_operation')
class HoursOfOperationEntity implements IHoursOfOperation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-array')
  days!: string[];

  @Column('simple-array')
  hours!: Date[][];

  @ManyToOne(
    () => RestaurantEntity,
    (restaurant) => restaurant.hoursOfOperation,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  restaurant!: RestaurantEntity;

  @DeleteDateColumn({
    select: false,
    name: 'deleted_at',
  })
  deletedAt!: Date;
}

export default HoursOfOperationEntity;
