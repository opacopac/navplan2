<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Service;

use Navplan\Aerodrome\Domain\Command\IAirportCreateAllCommand;
use Navplan\Aerodrome\Domain\Command\IAirportDeleteAllCommand;
use Navplan\Aerodrome\Domain\Model\Airport;
use Navplan\Aerodrome\Domain\Model\ShortAirport;
use Navplan\Aerodrome\Domain\Query\IAirportByExtentQuery;
use Navplan\Aerodrome\Domain\Query\IAirportByIcaoQuery;
use Navplan\Aerodrome\Domain\Query\IAirportByIdQuery;
use Navplan\Aerodrome\Domain\Query\IAirportByPositionQuery;
use Navplan\Aerodrome\Domain\Query\IAirportByTextQuery;
use Navplan\Aerodrome\Domain\Query\IAirportFeatureQuery;
use Navplan\Aerodrome\Domain\Query\IAirportRadioQuery;
use Navplan\Aerodrome\Domain\Query\IAirportRunwayQuery;
use Navplan\AerodromeChart\Domain\Service\IAirportChartService;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Webcam\Domain\Service\IWebcamService;


class AirportService implements IAirportService
{
    public function __construct(
        private readonly IAirportByIdQuery $airportByIdQuery,
        private readonly IAirportByIcaoQuery $airportByIcaoQuery,
        private readonly IAirportByExtentQuery $airportByExtentQuery,
        private readonly IAirportByPositionQuery $airportByPositionQuery,
        private readonly IAirportByTextQuery $airportByTextQuery,
        private readonly IAirportRunwayQuery $airportRunwayQuery,
        private readonly IAirportRadioQuery $airportRadioQuery,
        private readonly IAirportFeatureQuery $airportFeatureQuery,
        private readonly IAirportCreateAllCommand $airportCreateAllCommand,
        private readonly IAirportDeleteAllCommand $airportDeleteAllCommand,
        private readonly IAirportChartService $airportChartService,
        private readonly IWebcamService $webcamService
    )
    {
    }


    public function readById(int $id, ?string $token): Airport
    {
        $airport = $this->airportByIdQuery->read($id);
        $this->loadAirportSubItems($airport, $token);

        return $airport;
    }


    public function readByIcao(string $icao, ?string $token): Airport
    {
        $airport = $this->airportByIcaoQuery->read($icao);
        $this->loadAirportSubItems($airport, $token);

        return $airport;
    }


    /**
     * @param Extent2d $extent
     * @param int $zoom
     * @return ShortAirport[]
     */
    public function searchShortByExtent(Extent2d $extent, int $zoom): array
    {
        return $this->airportByExtentQuery->searchShortAirports($extent, $zoom);
    }


    /**
     * @param Position2d $position
     * @param float $maxRadius_deg
     * @param int $maxResults
     * @return ShortAirport[]
     */
    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array
    {
        return $this->airportByPositionQuery->searchShortAirports($position, $maxResults, $maxResults);
    }


    /**
     * @param string $searchText
     * @param int $maxResults
     * @return ShortAirport[]
     */
    public function searchByText(string $searchText, int $maxResults): array
    {
        return $this->airportByTextQuery->searchShortAirports($searchText, $maxResults);
    }


    /**
     * @param Airport[] $airports
     * @return void
     */
    public function insertAll(array $airports): void
    {
        $this->airportCreateAllCommand->createAll($airports);
    }


    public function deleteAll(): bool
    {
        return $this->airportDeleteAllCommand->deleteAll();
    }


    private function loadAirportSubItems(Airport &$airport, ?string $token): void
    {
        $airport->runways = $this->airportRunwayQuery->read($airport->id);
        $airport->radios = $this->airportRadioQuery->read($airport->id);

        if ($airport->icao) {
            $airport->mapfeatures = $this->airportFeatureQuery->read($airport->icao);
            $airport->charts2 = $this->airportChartService->readByAdIcao($airport->icao, $token);
            $airport->webcams = $this->webcamService->searchByIcao([$airport->icao]);
        }
    }
}
