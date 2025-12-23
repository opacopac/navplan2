<?php declare(strict_types=1);

namespace Navplan\Fir;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Fir\Domain\Query\IFirReadByIcaoQuery;
use Navplan\Fir\Domain\Service\IFirService;


interface IFirDiContainer
{
    function getFirReadByIcaoQuery(): IFirReadByIcaoQuery;

    function getFirService(): IFirService;

    function getFirController(): IRestController;
}
