<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbWhereClauseFactory
{
    public function __construct()
    {
    }


    public function simple(
        string $colName,
        DbWhereOp $operator,
        string|int|float|bool|null $value
    ): DbWhereClauseSimple
    {
        return new DbWhereClauseSimple(
            $colName,
            $operator,
            $value,
        );
    }


    public function equals(string $colName, string|int|float|bool|null $value): DbWhereClauseSimple
    {
        return $this->simple($colName, DbWhereOp::EQ, $value);
    }


    public function notEquals(string $colName, string|int|float|bool|null $value): DbWhereClauseSimple
    {
        return $this->simple($colName, DbWhereOp::NE, $value);
    }


    public function multi(DbWhereCombinator $combinator, DbWhereClause ...$clauses): DbWhereClauseMulti
    {
        if (count($clauses) < 2) {
            throw new \InvalidArgumentException("At least two clauses are required for a multi clause.");
        }

        return new DbWhereClauseMulti(
            $combinator,
            $clauses,
        );
    }


    public function and(DbWhereClause ...$clauses): DbWhereClauseMulti
    {
        return $this->multi(DbWhereCombinator::AND, ...$clauses);
    }


    public function or(DbWhereClause ...$clauses): DbWhereClauseMulti
    {
        return $this->multi(DbWhereCombinator::OR, ...$clauses);
    }
}
