<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbCol
{
    public function __construct(
        private readonly DbTable $table,
        private readonly string $name,
    ) {
    }


    public function getTable(): DbTable
    {
        return $this->table;
    }


    public function getName(): string
    {
        return $this->name;
    }
}
