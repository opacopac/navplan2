<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


readonly class DbCol
{
    public function __construct(
        private DbTable $table,
        private string $name,
        private DbColType $type,
        private bool $isNullable = false,
    )
    {
    }


    public function getTable(): DbTable
    {
        return $this->table;
    }


    public function getName(): string
    {
        return $this->name;
    }


    public function getType(): DbColType
    {
        return $this->type;
    }


    public function isNullable(): bool
    {
        return $this->isNullable;
    }
}
