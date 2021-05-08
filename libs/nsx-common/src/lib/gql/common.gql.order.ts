import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum OrderDirection {
  // Ascending order for a given `orderBy` argument.
  asc = 'asc',
  // Descending order for a given `orderBy` argument.
  desc = 'desc',
}

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description: 'Ascending or Descending direction for a given `orderBy` argument.',
});

@InputType({ isAbstract: true })
export abstract class Order {
  @Field(() => OrderDirection)
  direction: OrderDirection;
}
