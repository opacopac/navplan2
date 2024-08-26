<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Command;


interface IWnbEnvelopeDeleteCommand
{
    function deleteByAircraft(int $aircraftId): void;
}
