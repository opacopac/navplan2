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
        string|int|float|bool|null $value
    ): DbWhereSingleClause
    {
        return new DbWhereSingleClause(
            $colName,
            $operator,
            $value,
        );
    }


    public function equals(string $colName, string|int|float|bool|null $value): DbWhereSingleClause
    {
        return $this->single($colName, DbWhereOp::EQ, $value);
    }


    public function notEquals(string $colName, string|int|float|bool|null $value): DbWhereSingleClause
    {
        return $this->single($colName, DbWhereOp::NE, $value);
    }


    public function multi(DbWhereCombinator $combinator, DbWhereClause ...$clauses): DbWhereMultiClause
    {
        if (count($clauses) < 2) {
            throw new \InvalidArgumentException("At least two clauses are required for a multi clause.");
        }

        return new DbWhereMultiClause(
            $combinator,
            $clauses,
        );
    }


    public function and(DbWhereClause ...$clauses): DbWhereMultiClause
    {
        return $this->multi(DbWhereCombinator::AND, ...$clauses);
    }


    public function or(DbWhereClause ...$clauses): DbWhereMultiClause
    {
        return $this->multi(DbWhereCombinator::OR, ...$clauses);
    }
}
