<?php declare(strict_types=1);

namespace Navplan\System\Domain\Model;


class DbWhereClauseIn extends DbWhereClause
{
    public function __construct(
        public readonly string $colName,
        /**
         * @var string[]|int[]|float[]|bool[]
         */
        public readonly array $values
    )
    {
    }
}
