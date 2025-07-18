<?php declare(strict_types=1);

namespace Navplan\System\Domain\Model;


class DbWhereClauseFactory
{
    public function __construct()
    {
    }


    public function single(
        string $colName,
        DbWhereOp $operator,
        string|int|float|bool $value
    ): DbWhereSingleClause
    {
        return new DbWhereSingleClause(
            $colName,
            $operator,
            $value,
        );
    }


    public function equals(string $colName, string|int|float|bool $value): DbWhereSingleClause
    {
        return $this->single($colName, DbWhereOp::EQ, $value);
    }


    public function notEquals(string $colName, string|int|float|bool $value): DbWhereSingleClause
    {
        return $this->single($colName, DbWhereOp::NE, $value);
    }


    public function dual(
        DbWhereClause $clause1,
        DbWhereCombinator $combinator,
        DbWhereClause $clause2
    ): DbWhereDualClause
    {
        return new DbWhereDualClause(
            $clause1,
            $combinator,
            $clause2,
        );
    }


    public function and(DbWhereClause $clause1, DbWhereClause $clause2): DbWhereDualClause
    {
        return $this->dual($clause1, DbWhereCombinator::AND, $clause2);
    }


    public function or(DbWhereClause $clause1, DbWhereClause $clause2): DbWhereDualClause
    {
        return $this->dual($clause1, DbWhereCombinator::OR, $clause2);
    }
}
