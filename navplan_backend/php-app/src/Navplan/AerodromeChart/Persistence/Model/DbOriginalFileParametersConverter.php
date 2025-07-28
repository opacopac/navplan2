<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Model;

use Navplan\AerodromeChart\Domain\Model\OriginalFileParameters;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;


class DbOriginalFileParametersConverter
{
    public static function fromDbRow(DbRowAirportCharts $row): OriginalFileParameters
    {
        return new OriginalFileParameters(
            $row->getImportFilename(),
            $row->getImportChecksum(),
            DbPdfParametersConverter::fromDbRow($row),
        );
    }


    public static function bindInsertValues(OriginalFileParameters $params, IDbInsertCommandBuilder $icb, DbTableAirportCharts $table): void
    {
        $icb->setColValue($table->colImportFilename(), $params->importFilename)
            ->setColValue($table->colImportChecksum(), $params->importChecksum);

        DbPdfParametersConverter::bindInsertValues($params->pdfParameters, $icb, $table);
    }
}
