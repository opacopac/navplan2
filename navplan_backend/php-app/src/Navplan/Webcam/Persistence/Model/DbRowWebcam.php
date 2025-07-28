<?php declare(strict_types=1);

namespace Navplan\Webcam\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowWebcam extends DbRow
{
    public function __construct(
        private readonly DbTableWebcam $table,
        array $row
    )
    {
        parent::__construct($row);
    }

    public function getId(): int
    {
        return $this->getValue($this->table->colId());
    }


    public function getName(): string
    {
        return $this->getValue($this->table->colName());
    }


    public function getUrl(): string
    {
        return $this->getValue($this->table->colUrl());
    }


    public function getLatitude(): ?float
    {
        return $this->getValue($this->table->colLat());
    }


    public function getLongitude(): ?float
    {
        return $this->getValue($this->table->colLon());
    }


    public function getAirportIcao(): ?string
    {
        return $this->getValue($this->table->colAdIcao());
    }
}
