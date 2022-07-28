<?php declare(strict_types=1);

namespace Navplan\Webcam;

use Navplan\Webcam\Domain\Service\IWebcamService;


interface IWebcamDiContainer {
    function getWebcamService(): IWebcamService;
}
