<?php declare(strict_types=1);

namespace Navplan\Webcam;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Webcam\Domain\Query\IWebcamByExtentQuery;
use Navplan\Webcam\Domain\Query\IWebcamByIcaoQuery;


interface IWebcamDiContainer
{
    function getWebcamController(): IRestController;

    function getWebcamByExtentQuery(): IWebcamByExtentQuery;

    function getWebcamByIcaoQuery(): IWebcamByIcaoQuery;
}
