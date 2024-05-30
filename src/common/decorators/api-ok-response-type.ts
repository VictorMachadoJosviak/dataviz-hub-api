import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PageableQueryResponse } from '../pagination/pagination.dto';

export const ApiOkResponseCustom = <GenericType extends Type<unknown>>(
  data: GenericType,
) =>
  applyDecorators(
    ApiExtraModels(PageableQueryResponse, data),
    ApiOkResponse({
      description: `The paginated result of ${data.name}`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageableQueryResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(data) },
              },
            },
          },
        ],
      },
    }),
  );
