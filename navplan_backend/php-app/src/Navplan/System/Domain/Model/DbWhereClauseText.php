<?php declare(strict_types=1);

namespace Navplan\System\Domain\Model;


class DbWhereClauseText extends DbWhereClause
{
    public function __construct(
        public readonly string $colName,
        public readonly DbWhereOpTxt $operator,
        public readonly string $value
    )
    {
    }
}
