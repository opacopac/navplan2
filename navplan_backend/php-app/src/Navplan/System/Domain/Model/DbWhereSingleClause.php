<?php declare(strict_types=1);

namespace Navplan\System\Domain\Model;


class DbWhereSingleClause extends DbWhereClause
{
    public function __construct(
        public readonly string $colName,
        public readonly DbWhereOperator $operator,
        public readonly string|int|float|bool|null $value
    )
    {
    }
}
