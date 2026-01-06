<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;


interface INotamAirspaceParser
{
    /**
     * @param \Navplan\Notam\Domain\Model\RawNotam[] $notamList
     */
    public function tryFindMatchingAirspace(array &$notamList): void;
}
