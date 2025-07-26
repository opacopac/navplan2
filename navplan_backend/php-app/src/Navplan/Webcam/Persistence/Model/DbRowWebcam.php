<?php declare(strict_types=1);

namespace Navplan\Webcam\Persistence\Model;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Persistence\Model\DbPosition2dConverter;
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


    public function getPosition(): ?Position2d
    {
        return DbPosition2dConverter::fromDbRow($this->row);
    }


    public function getAirportIcao(): ?string
    {
        return $this->getValue($this->table->colAdIcao());
    }
}
