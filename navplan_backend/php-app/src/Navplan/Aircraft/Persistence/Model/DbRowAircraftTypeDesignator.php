<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowAircraftTypeDesignator extends DbRow
{
    public function __construct(
        private readonly DbTableAircraftTypeDesignator $table,
        array $row
    )
    {
        parent::__construct($row);
    }


    public function getId(): int
    {
        return $this->getValue($this->table->colId());
    }


    public function getDesignator(): string
    {
        return $this->getValue($this->table->colDesignator());
    }


    public function getModel(): string
    {
        return $this->getValue($this->table->colModel());
    }


    public function getManufacturer(): string
    {
        return $this->getValue($this->table->colManufacturer());
    }


    public function getAcType(): string
    {
        return $this->getValue($this->table->colAcType());
    }


    public function getEngType(): string
    {
        return $this->getValue($this->table->colEngType());
    }


    public function getEngCount(): int
    {
        return $this->getValue($this->table->colEngCount());
    }


    public function getWtc(): string
    {
        return $this->getValue($this->table->colWtc());
    }
}
