<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Model;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Persistence\Model\DbExtent2dConverter;
use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowAirportCharts extends DbRow
{
    public function __construct(
        private readonly DbTableAirportCharts $table,
        array $row
    )
    {
        parent::__construct($row);
    }


    public function getId(): int
    {
        return $this->getValue($this->table->colId());
    }


    public function getAdIcao(): string
    {
        return $this->getValue($this->table->colAdIcao());
    }


    public function getUserId(): ?int
    {
        return $this->getValue($this->table->colUserId());
    }


    public function getSource(): string
    {
        return $this->getValue($this->table->colSource());

    }


    public function getName(): string
    {
        return $this->getValue($this->table->colName());
    }


    public function isActive(): bool
    {
        return $this->getValue($this->table->colActive());
    }


    public function getFilename(): string
    {
        return $this->getValue($this->table->colFilename());
    }


    public function getExtent(): Extent2d
    {
        return DbExtent2dConverter::fromDbRow($this->row);
    }


    public function getImportFilename(): string
    {
        return $this->getValue($this->table->colFilename());
    }


    public function getImportChecksum(): string
    {
        return $this->getValue($this->table->colImportChecksum());
    }


    public function getPdfPage(): ?int
    {
        return $this->getValue($this->table->colPdfPage());
    }


    public function getPdfRotDeg(): ?float
    {
        return $this->getValue($this->table->colPdfRotDeg());
    }


    public function getPdfDpi(): ?int
    {
        return $this->getValue($this->table->colPdfDpi());
    }


    public function getRegistrationType(): string
    {
        return $this->getValue($this->table->colRegistrationType());
    }


    public function getGeocoordType(): string
    {
        return $this->getValue($this->table->colGeocoordType());
    }


    public function getPos1PixelX(): ?int
    {
        return $this->getValue($this->table->colPos1PixelX());
    }


    public function getPos1PixelY(): ?int
    {
        return $this->getValue($this->table->colPos1PixelY());
    }


    public function getPos1GeoCoordE(): ?float
    {
        return $this->getValue($this->table->colPos1GeocoordE());
    }


    public function getPos1GeoCoordN(): ?float
    {
        return $this->getValue($this->table->colPos1GeocoordN());
    }


    public function getChartScale(): ?int
    {
        return $this->getValue($this->table->colChartScale());
    }


    public function getPos2PixelX(): ?int
    {
        return $this->getValue($this->table->colPos2PixelX());
    }


    public function getPos2PixelY(): ?int
    {
        return $this->getValue($this->table->colPos2PixelY());
    }


    public function getPos2GeoCoordE(): ?float
    {
        return $this->getValue($this->table->colPos2GeocoordE());
    }


    public function getPos2GeoCoordN(): ?float
    {
        return $this->getValue($this->table->colPos2GeocoordN());
    }
}
