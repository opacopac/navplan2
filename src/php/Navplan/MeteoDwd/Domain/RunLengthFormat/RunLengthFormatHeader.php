<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\RunLengthFormat;

use DateTime;


class RunLengthFormatHeader {
    private $format;
    private $measurementTimeUtc;
    private $wmoNumber;
    private $lengthBytes;
    private $formatVersion;
    private $swVersion;
    private $precision;
    private $intervalMinutes;
    private $pixelRowsCols;
    private $predictionTimeMinutes;
    private $moduleFlags;
    private $quantificationType;
    private $text_ms;
    private $text_st;


    // region GETTER

    public function getFormat(): string {
        return $this->format;
    }


    public function getMeasurementTimeUtc(): DateTime {
        return $this->measurementTimeUtc;
    }


    public function getWmoNumber(): int {
        return $this->wmoNumber;
    }


    public function getLengthBytes(): int {
        return $this->lengthBytes;
    }


    public function getFormatVersion(): int {
        return $this->formatVersion;
    }


    public function getSwVersion(): string {
        return $this->swVersion;
    }


    public function getPrecision(): float {
        return $this->precision;
    }


    public function getIntervalMinutes(): int {
        return $this->intervalMinutes;
    }


    public function getPixelRowsCols(): array {
        return $this->pixelRowsCols;
    }


    public function getPredictionTimeMinutes(): ?int {
        return $this->predictionTimeMinutes;
    }


    public function getModuleFlags(): ?int {
        return $this->moduleFlags;
    }


    public function getQuantificationType(): ?int {
        return $this->quantificationType;
    }


    public function getTextMs(): string {
        return $this->text_ms;
    }


    public function getTextSt(): ?string {
        return $this->text_st;
    }

    // endregion


    public function __construct(
        string $format,
        DateTime $measurementTimeUtc,
        int $wmoNumber,
        int $lengthBytes,
        int $formatVersion,
        string $swVersion,
        float $precision,
        int $intervalMinutes,
        array $pixelRowsCols,
        ?int $predictionTimeMinutes,
        ?int $moduleFlags,
        ?int $quantificationType,
        string $text_ms,
        ?string $text_st
    ) {
        $this->format = $format;
        $this->measurementTimeUtc = $measurementTimeUtc;
        $this->wmoNumber = $wmoNumber;
        $this->lengthBytes = $lengthBytes;
        $this->formatVersion = $formatVersion;
        $this->swVersion = $swVersion;
        $this->precision = $precision;
        $this->intervalMinutes = $intervalMinutes;
        $this->pixelRowsCols = $pixelRowsCols;
        $this->predictionTimeMinutes = $predictionTimeMinutes;
        $this->moduleFlags = $moduleFlags;
        $this->quantificationType = $quantificationType;
        $this->text_ms = $text_ms;
        $this->text_st = $text_st;
    }
}
