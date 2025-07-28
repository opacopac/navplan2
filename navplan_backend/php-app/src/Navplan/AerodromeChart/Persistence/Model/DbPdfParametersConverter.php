<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Model;

use Navplan\AerodromeChart\Domain\Model\PdfParameters;
use Navplan\Common\Domain\Model\Angle;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;


class DbPdfParametersConverter
{
    public static function fromDbRow(DbRowAirportCharts $row): ?PdfParameters
    {
        if ($row->getPdfPage() === null || $row->getPdfRotDeg() === null || $row->getPdfDpi() === null) {
            return null;
        }

        return new PdfParameters(
            $row->getPdfPage(),
            Angle::fromDeg($row->getPdfRotDeg()),
            $row->getPdfDpi()
        );
    }


    public static function bindInsertValues(?PdfParameters $params, IDbInsertCommandBuilder $icb, DbTableAirportCharts $table): void
    {
        $icb->setColValue($table->colPdfPage(), $params?->page)
            ->setColValue($table->colPdfRotDeg(), $params?->rotation->toDeg())
            ->setColValue($table->colPdfDpi(), $params?->dpi);
    }
}
