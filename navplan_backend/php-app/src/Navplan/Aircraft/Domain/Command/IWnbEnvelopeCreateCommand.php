<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Command;

use Navplan\Aircraft\Domain\Model\WnbEnvelope;


interface IWnbEnvelopeCreateCommand
{
    /**
     * @param int $aircraftId
     * @param WnbEnvelope[] $wnbEnvelopes
     */
    function create(int $aircraftId, array $wnbEnvelopes): void;
}
