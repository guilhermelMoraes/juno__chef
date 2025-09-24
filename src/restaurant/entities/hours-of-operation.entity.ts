import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { HoursOfOperation } from '../restaurant.model';
import RestaurantEntity from './restaurant.entity';

@Entity('hours_of_operation')
class HoursOfOperationEntity implements HoursOfOperation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-array')
  days!: string[];

  @Column('simple-array')
  hours!: string[][];

  @ManyToOne(
    () => RestaurantEntity,
    (restaurant) => restaurant.hoursOfOperation,
    { cascade: true },
  )
  restaurant!: RestaurantEntity;
}

export default HoursOfOperationEntity;
