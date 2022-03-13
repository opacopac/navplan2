<?php declare(strict_types=1);

namespace Navplan\System\Imagick;

use Imagick;
use ImagickPixel;
use Navplan\Common\DomainModel\Angle;
use Navplan\System\DomainModel\IPdf;


class ImagickPdf implements IPdf {
    private Imagick $im;


    public function __construct(
        string $abs_filename,
        float $resolutionDpi,
        int $page,
        Angle $rotation
    ) {
        $this->im = new Imagick();
        $this->im->setResolution($resolutionDpi, $resolutionDpi);
        $this->im->setColorspace(Imagick::COLORSPACE_RGB);
        $this->im->setBackgroundColor(new ImagickPixel('white'));
        $this->im->readImage($abs_filename . "[" . $page . "]");
        $this->im->setimagebackgroundcolor("#ffffff");
        $this->im = $this->im->mergeImageLayers(Imagick::LAYERMETHOD_FLATTEN);

        if ($rotation->deg() != 0) {
            $this->im->rotateImage(new ImagickPixel('#00000000'), $rotation->deg());
        }
    }


    public function saveAsImage(string $filename): void {
        $this->im->writeImage($filename);
    }
}
