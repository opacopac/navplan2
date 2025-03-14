<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Temperature;

class DistancePerformanceTable
{
    /**
     * @param string $profileName
     * @param PerformanceTableAltitudeReference $altitudeReference
     * @param Length[] $altitudeSteps
     * @param PerformanceTableTemperatureReference $temperatureReference
     * @param Temperature[] $temperatureSteps
     * @param Length[][] $distanceValues
     * @param DistancePerformanceCorrectionFactors $correctionFactors
     */
    public function __construct(
        public string $profileName,
        public PerformanceTableAltitudeReference $altitudeReference,
        public array $altitudeSteps,
        public PerformanceTableTemperatureReference $temperatureReference,
        public array $temperatureSteps,
        public array $distanceValues,
        public DistancePerformanceCorrectionFactors $correctionFactors
    )
    {
    }
}
