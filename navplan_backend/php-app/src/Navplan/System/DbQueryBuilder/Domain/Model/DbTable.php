<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbTable
{
    /**
     * @var DbCol[]
     */
    private array $cols = [];


    /**
     * @param string $name
     * @param string|null $alias
     * @param string[] $colNames
     */
    public function __construct(
        private readonly string $name,
        private readonly ?string $alias = null
    )
    {
    }


    public function getName(): string
    {
        return $this->name;
    }


    public function hasAlias(): bool
    {
        return $this->alias !== null;
    }


    public function getAlias(): ?string
    {
        return $this->alias;
    }


    public function getCol(string $colName): ?DbCol
    {
        return $this->cols[$colName] ?? null;
    }


    /**
     * @return DbCol[]
     */
    public function getCols(): array
    {
        return $this->cols;
    }


    public function addCol(string $colName, DbColType $colType, bool $isNullable = false): DbCol
    {
        $col = new DbCol($this, $colName, $colType, $isNullable);
        $this->cols[$colName] = $col;

        return $col;
    }
}
