<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowNavaid extends DbRow
{
    public function __construct(
        private readonly DbTableNavaid $table,
        array $row
    )
    {
        parent::__construct($row);
    }

    public function getId(): int
    {
        return $this->getValue($this->table->colId());
    }


    public function getType(): string
    {
        return $this->getValue($this->table->colType());
    }


    public function getCountry(): string
    {
        return $this->getValue($this->table->colCountry());
    }


    public function getName(): string
    {
        return $this->getValue($this->table->colName());
    }


    public function getKuerzel(): string
    {
        return $this->getValue($this->table->colkuerzel());
    }


    public function getLatitude(): float
    {
        return $this->getValue($this->table->colLat());
    }


    public function getLongitude(): float
    {
        return $this->getValue($this->table->colLon());
    }


    public function getElevation(): float
    {
        return $this->getValue($this->table->colElevation());
    }


    public function getFrequency(): string
    {
        return $this->getValue($this->table->colfrequency());
    }


    public function getDeclination(): float
    {
        return $this->getValue($this->table->coldeclination());
    }


    public function isTrueNorth(): bool
    {
        return $this->getValue($this->table->coltrueNorth());
    }
}
