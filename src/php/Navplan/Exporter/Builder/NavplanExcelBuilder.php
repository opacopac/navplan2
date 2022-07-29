<?php declare(strict_types=1);

namespace Navplan\Exporter\Builder;

require_once __DIR__ . "/../../../vendor/autoload.php";

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Model\FuelCalc;
use Navplan\Flightroute\Domain\Model\Waypoint;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\NamedRange;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\PageSetup;


class NavplanExcelBuilder {
    const SFC = 0.142822265625;
    const SFR = 0.75;
    private array $sheetColWidth = array("A" => 42 * self::SFC, "B" => 33 * self::SFC, "C" => 112 * self::SFC,
        "D" => 32 * self::SFC, "E" => 32 * self::SFC, "F" => 32 * self::SFC, "G" => 0 * self::SFC, "H" => 32 * self::SFC,
        "I" => 32 * self::SFC, "J" => 32 * self::SFC, "K" => 52 * self::SFC, "L" => 52 * self::SFC);
    private array $sheetRowHeight = array("Title" => 45 * self::SFR, "Rest" => 22 * self::SFR);
    private int $sheetRowCount = 33;
    private array $sheetRowHide = [23, 26];
    private array $planTitle = array("A1" => "NAV-FLIGHTPLAN");
    private array $genColTitle = array("A2" => "ACFT IDENT:", "D2" => "Date:", "H2" => "Off Bl.:", "K2" => "QNH:",
        "A3" => "Pilot:", "D3" => "GS:", "H3" => "Bl. on:", "K3" => "RWY:");
    private array $ckpColTitle = array("A4" => "Freq.", "B4" => "C/S", "C4" => "Checkpoint", "D4" => "MT",
        "E4" => "Dist.", "F4" => "Alt.", "H4" => "EET", "I4" => "ETO", "J4" => "ATO", "K4" => "Remarks");
    private array $mergeCells = ["A1:L1", "A2:C2", "D2:F2", "H2:J2", "K2:L2", "A3:C3", "E3:F3", "H3:J3", "K3:L3", "K4:L4"];
    private array $borderCellsTitle = ["A1:L1", "A2:C2", "D2:F2", "H2:J2", "K2:L2", "A3:C3", "D3:F3", "H3:J3", "K3:L3", "K4:L4"];
    private array $ckpKeys = array("freq" => "A", "callsign" => "B", "checkpoint" => "C", "mtText" => "D",
        "distText" => "E", "alt" => "F", "remark" => "K");


    // region text/cell styles
    private array $styleBorderThin = array(
        'borders' => array(
            'outline' => array(
                'borderStyle' => Border::BORDER_THIN,
            )
        )
    );

    private array $styleBorderThick = array(
        'borders' => array(
            'outline' => array(
                'borderStyle' => Border::BORDER_MEDIUM,
            )
        )
    );

    private array $styleAllBorder = array(
        'borders' => array(
            'allBorders' => array(
                'borderStyle' => Border::BORDER_THIN,
                'color' => array('argb' => 'FF000000')
            )
        )
    );

    private array $styleNotUse = array(
        'borders' => array(
            'allBorders' => array(
                'borderStyle' => Border::BORDER_THIN,
                'color' => array('argb' => 'FF000000')
            ),
            'diagonal' => array(
                'borderStyle' => Border::BORDER_THIN,
                'color' => array('argb' => 'FF000000')
            )
        ),
        'fill' => array(
            'fillType' => Fill::FILL_PATTERN_LIGHTGRAY,
            'startColor' => array('rgb' => '000000'),
            'endColor' => array('rgb' => 'ffffff')
        )
    );

    private array $styleTitle = array(
        'font' => array(
            'bold' => true,
            'size' => 16,
            'name' => 'Arial'
        ),
        'alignment' => array(
            'horizontal' => Alignment::HORIZONTAL_CENTER,
            'vertical' => Alignment::VERTICAL_CENTER
        )
    );

    private array $styleGenTitle = array(
        'font' => array(
            'bold' => true,
            'size' => 10,
            'name' => 'Arial'
        ),
        'alignment' => array(
            'vertical' => Alignment::VERTICAL_CENTER
        )
    );

    private array $styleCkpTitle = array(
        'font' => array(
            'bold' => true,
            'size' => 10,
            'name' => 'Arial'
        ),
        'alignment' => array(
            'vertical' => Alignment::VERTICAL_CENTER
        ),
        'fill' => array(
            'fillType' => Fill::FILL_PATTERN_LIGHTGRAY,
            'startColor' => array('rgb' => '000000'),
            'endColor' => array('rgb' => 'ffffff')
        )
    );

    private array $styleInputField = array(
        'font' => array(
            'size' => 10,
            'name' => 'Arial'
        ),
        'alignment' => array(
            'vertical' => Alignment::VERTICAL_CENTER,
            'horizontal' => Alignment::HORIZONTAL_CENTER
        ),
        'fill' => array(
            'fillType' => Fill::FILL_SOLID,
            'color' => array('rgb' => 'ccffff')
        )
    );

    private array $styleInputBackground = array(
        'fill' => array(
            'fillType' => Fill::FILL_SOLID,
            'color' => array('rgb' => 'ccffff')
        )
    );

    private array $styleTextWps = array(
        'font' => array(
            'size' => 10,
            'name' => 'Arial Narrow'
        ),
        'alignment' => array(
            'vertical' => Alignment::VERTICAL_CENTER
        )
    );

    private array $styleTextMtDist = array(
        'font' => array(
            'size' => 10,
            'name' => 'Arial'
        ),
        'alignment' => array(
            'vertical' => Alignment::VERTICAL_CENTER,
            'horizontal' => Alignment::HORIZONTAL_CENTER
        )
    );

    private array $styleTextAltEet = array(
        'font' => array(
            'size' => 10,
            'name' => 'Arial Narrow'
        ),
        'alignment' => array(
            'vertical' => Alignment::VERTICAL_CENTER,
            'horizontal' => Alignment::HORIZONTAL_CENTER
        )
    );

    private array $styleTextAlternateTitle = array(
        'font' => array(
            'underline' => true,
            'size' => 10,
            'name' => 'Arial Narrow'
        ),
        'alignment' => array(
            'vertical' => Alignment::VERTICAL_CENTER
        )
    );

    private array $styleFuelTitle = array(
        'font' => array(
            'bold' => true,
            'size' => 11,
            'name' => 'Arial'
        ),
        'alignment' => array(
            'horizontal' => Alignment::HORIZONTAL_CENTER,
            'vertical' => Alignment::VERTICAL_CENTER
        ),
        'borders' => array(
            'allBorders' => array(
                Border::BORDER_THIN,
                'color' => array('argb' => 'FF000000')
            )
        ),
        'fill' => array(
            'fillType' => Fill::FILL_PATTERN_LIGHTGRAY,
            'startColor' => array('rgb' => '000000'),
            'endColor' => array('rgb' => 'ffffff')
        )
    );

    private array $styleFuelColTitle = array(
        'font' => array(
            'bold' => true,
            'size' => 10,
            'name' => 'Arial'
        ),
        'alignment' => array(
            'horizontal' => Alignment::HORIZONTAL_CENTER,
            'vertical' => Alignment::VERTICAL_CENTER
        ),
        'borders' => array(
            'allBorders' => array(
                'borderStyle' => Border::BORDER_THIN,
                'color' => array('argb' => 'FF000000')
            )
        ),
        'fill' => array(
            'fillType' => Fill::FILL_PATTERN_LIGHTGRAY,
            'startColor' => array('rgb' => '000000'),
            'endColor' => array('rgb' => 'ffffff')
        )
    );

    private array $styleFuelConsumptionTitle = array(
        'font' => array(
            'bold' => true,
            'size' => 10,
            'name' => 'Arial'
        ),
        'alignment' => array(
            'horizontal' => Alignment::HORIZONTAL_CENTER,
            'vertical' => Alignment::VERTICAL_CENTER
        )
    );

    private array $styleFuelRowTitle = array(
        'font' => array(
            'size' => 10,
            'name' => 'Arial Narrow'
        ),
        'alignment' => array(
            'vertical' => Alignment::VERTICAL_CENTER
        ),
        'borders' => array(
            'allBorders' => array(
                'borderStyle' => Border::BORDER_THIN,
                'color' => array('argb' => 'FF000000')
            )
        )
    );

    private array $styleBlockFuelTitle = array(
        'font' => array(
            'bold' => true,
            'size' => 10,
            'name' => 'Arial Narrow'
        ),
        'alignment' => array(
            'vertical' => Alignment::VERTICAL_CENTER
        ),
        'borders' => array(
            'allBorders' => array(
                'borderStyle' => Border::BORDER_THIN,
                'color' => array('argb' => 'FF000000')
            )
        )
    );

    private array $styleFuelText = array(
        'font' => array(
            'size' => 10,
            'name' => 'Arial'
        ),
        'alignment' => array(
            'vertical' => Alignment::VERTICAL_CENTER,
            'horizontal' => Alignment::HORIZONTAL_CENTER
        ),
        'borders' => array(
            'allBorders' => array(
                'borderStyle' => Border::BORDER_THIN,
                'color' => array('argb' => 'FF000000')
            )
        )
    );

    // endregion


    public function __construct() {
    }


    public function buildExcel(Flightroute $flightroute, FuelCalc $fuelCalc): Spreadsheet {
        $objPHPExcel = new Spreadsheet();
        $this->createPageSetup($objPHPExcel);
        $this->createTitle($objPHPExcel);
        $this->createGeneralData($objPHPExcel, $flightroute);
        $this->createCheckpoints($objPHPExcel, $flightroute);
        $this->createAlternate($objPHPExcel, $flightroute);
        $this->createComments($objPHPExcel, $flightroute);
        $this->createFuelTitles($objPHPExcel, $flightroute);
        $this->createFuelContent($objPHPExcel, $fuelCalc);

        return $objPHPExcel;
    }


    private function createPageSetup(Spreadsheet $objPHPExcel): void {
        // set doc title
        $objPHPExcel->getProperties()->setTitle("NAV-Flightplan");

        // select active sheet
        $objPHPExcel->setActiveSheetIndex(0);

        // Set page orientation and size
        $objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PageSetup::ORIENTATION_LANDSCAPE);
        $objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PageSetup::PAPERSIZE_A4);
        $objPHPExcel->getActiveSheet()->getPageMargins()->setTop(0.394);
        $objPHPExcel->getActiveSheet()->getPageMargins()->setLeft(0.315);
        $objPHPExcel->getActiveSheet()->getPageMargins()->setRight(0.236);
        $objPHPExcel->getActiveSheet()->getPageMargins()->setBottom(0.394);

        // set sheet title
        $objPHPExcel->getActiveSheet()->setTitle('NAV-Flightplan');

        // set default font
        $objPHPExcel->getDefaultStyle()->getFont()->setName('Arial')->setSize(10);

        // set column widths
        foreach ($this->sheetColWidth as $colName => $colWidth) {
            if ($colWidth > 0) {
                $objPHPExcel->getActiveSheet()->getColumnDimension($colName)->setWidth($colWidth);
            } else {
                $objPHPExcel->getActiveSheet()->getColumnDimension($colName)->setVisible(false);
            }
        }

        // set row heights
        for ($i = 0; $i < $this->sheetRowCount; $i++) {
            if ($i == 0) {
                $h = $this->sheetRowHeight["Title"];
            } else if (in_array($i + 1, $this->sheetRowHide)) {
                $h = 0;
            } else {
                $h = $this->sheetRowHeight["Rest"];
            }

            if ($h > 0) {
                $objPHPExcel->getActiveSheet()->getRowDimension($i + 1)->setRowHeight($h);
            } else {
                $objPHPExcel->getActiveSheet()->getRowDimension($i + 1)->setVisible(false);
            }
        }
    }


    private function createTitle(Spreadsheet $objPHPExcel): void {
        // merge cells
        foreach ($this->mergeCells as $cellRange) {
            $objPHPExcel->getActiveSheet()->mergeCells($cellRange);
        }

        // title borders
        foreach ($this->borderCellsTitle as $cellRange) {
            $objPHPExcel->getActiveSheet()->getStyle($cellRange)->applyFromArray($this->styleBorderThin);
        }

        // plan title
        foreach ($this->planTitle as $cellName => $text) {
            $objPHPExcel->getActiveSheet()->setCellValue($cellName, $text);
            $objPHPExcel->getActiveSheet()->getStyle($cellName)->applyFromArray($this->styleTitle);
        }
    }


    private function createGeneralData(Spreadsheet $objPHPExcel, Flightroute $flightroute): void {
        // general data titles
        foreach ($this->genColTitle as $cellName => $text) {
            $objPHPExcel->getActiveSheet()->setCellValue($cellName, $text);
            $objPHPExcel->getActiveSheet()->getStyle($cellName)->applyFromArray($this->styleGenTitle);
        }


        // groundspeed cell
        $speedString = $flightroute->aircraftSpeed ? $flightroute->aircraftSpeed->getKt() : "";
        $objPHPExcel->getActiveSheet()->setCellValue("E3", $speedString);
        $objPHPExcel->getActiveSheet()->getStyle("E3")->applyFromArray($this->styleInputField);
        $objPHPExcel->addNamedRange(
            new NamedRange('GROUND_SPEED', $objPHPExcel->getActiveSheet(), '=$E$3')
        );
    }


    private function createCheckpoints(Spreadsheet $objPHPExcel, Flightroute $flightroute): void {
        // checkpoint titles
        foreach ($this->ckpColTitle as $cellName => $text) {
            $objPHPExcel->getActiveSheet()->setCellValue($cellName, $text);
            $objPHPExcel->getActiveSheet()
                ->getStyle($cellName)
                ->applyFromArray($this->styleCkpTitle)
                ->applyFromArray($this->styleBorderThin);
        }

        // checkpoint title border
        $objPHPExcel->getActiveSheet()->getStyle("A4:L4")->applyFromArray($this->styleBorderThick);

        // checkpoint grid
        $objPHPExcel->getActiveSheet()->getStyle("A5:L25")->applyFromArray($this->styleAllBorder);

        // do-not-use-cells (1st row)
        $objPHPExcel->getActiveSheet()->getStyle("D5:I5")->applyFromArray($this->styleNotUse);

        // checkpoint cell/text styles
        for ($i = 5; $i < 26; $i++) {
            // merge remark cells
            $objPHPExcel->getActiveSheet()->mergeCells("K" . $i . ":L" . $i);

            // cell/text styles
            $objPHPExcel->getActiveSheet()->getStyle("A" . $i . ":C" . $i)->applyFromArray($this->styleTextWps); // freq, c/s, checkpoint
            $objPHPExcel->getActiveSheet()->getStyle("D" . $i . ":E" . $i)->applyFromArray($this->styleTextMtDist); // mt, dist
            $objPHPExcel->getActiveSheet()->getStyle("F" . $i . ":H" . $i)->applyFromArray($this->styleTextAltEet); // alt, eet
            $objPHPExcel->getActiveSheet()->getStyle("K" . $i)->applyFromArray($this->styleTextWps); // remarks
        }

        // input background
        $objPHPExcel->getActiveSheet()->getStyle("A5:C5")->applyFromArray($this->styleInputBackground);
        $objPHPExcel->getActiveSheet()->getStyle("A6:F22")->applyFromArray($this->styleInputBackground);
        $objPHPExcel->getActiveSheet()->getStyle("K5:L22")->applyFromArray($this->styleInputBackground);
        $objPHPExcel->getActiveSheet()->getStyle("A25:F25")->applyFromArray($this->styleInputBackground);
        $objPHPExcel->getActiveSheet()->getStyle("K25:L25")->applyFromArray($this->styleInputBackground);

        // add eet-formulas
        for ($i = 6; $i < 22; $i++) {
            $objPHPExcel->getActiveSheet()->setCellValue("G" . $i, $this->getPreEetFormula($i));
            $objPHPExcel->getActiveSheet()->setCellValue("H" . $i, $this->getEetFormula($i));
        }

        // checkpoint values
        for ($i = 0; $i < 18; $i++) {
            $waypoint = $i < count($flightroute->waypoinList) ? $flightroute->waypoinList[$i] : NULL;
            foreach ($this->ckpKeys as $key => $col) {
                $wpString = $this->getWpString($waypoint, $key);
                $objPHPExcel->getActiveSheet()->setCellValueExplicit($col . ($i + 5), $wpString, DataType::TYPE_STRING);
            }
        }

        // pre-eet/dist sums
        $objPHPExcel->getActiveSheet()->setCellValue("E23", "=SUM(E6:E22)");
        $objPHPExcel->getActiveSheet()->setCellValue("G23", "=SUM(G6:G22)");

        // triptime cell
        $objPHPExcel->addNamedRange(new NamedRange('TRIP_TIME', $objPHPExcel->getActiveSheet(), '=$H$23'));
        $objPHPExcel->getActiveSheet()->setCellValue("H23", "=IF(G23>0, G23+COUNTIF(D6:D22, \"VAC\")*5, \"\")");
    }


    private function createAlternate(Spreadsheet $objPHPExcel, Flightroute $flightroute): void {
        // alternate title
        $objPHPExcel->getActiveSheet()->getStyle("C24")->applyFromArray($this->styleTextAlternateTitle);
        $objPHPExcel->getActiveSheet()->setCellValue("C24", "Alternate:");

        // alternate values
        foreach ($this->ckpKeys as $key => $col) {
            $wpText = $this->getWpString($flightroute->alternate, $key);
            $objPHPExcel->getActiveSheet()->setCellValue($col . "25", $wpText);
        }

        // alternate eet-formulas
        $objPHPExcel->getActiveSheet()->setCellValue("G25", $this->getPreEetFormula(25));
        $objPHPExcel->getActiveSheet()->setCellValue("H25", "=IF(G25>0,G25 & \"/+5\",\"\")");

        // alternate time cell
        $objPHPExcel->addNamedRange(new NamedRange('ALTERNATE_TIME', $objPHPExcel->getActiveSheet(), '=$H$26'));
        $objPHPExcel->getActiveSheet()->setCellValue("H26", "=IF(G25>0,G25+5,0)");
    }


    private function createComments(Spreadsheet $objPHPExcel, Flightroute $flightroute): void {
        // comment cells
        $commentLines = explode("\n", $flightroute->comments ?: "");
        for ($i = 27; $i <= 33; $i++) {
            $objPHPExcel->getActiveSheet()->mergeCells("A" . $i . ":F" . $i);
            $objPHPExcel->getActiveSheet()->getStyle("K" . $i)->applyFromArray($this->styleTextWps);

            if (count($commentLines) > $i - 27)
                $objPHPExcel->getActiveSheet()->setCellValue("A" . $i, $commentLines[$i - 27]);
        }

        // comment grid
        $objPHPExcel->getActiveSheet()->getStyle("A27:F33")->applyFromArray($this->styleAllBorder);
    }


    private function createFuelTitles(Spreadsheet $objPHPExcel, Flightroute $flightroute): void {
        // fuel title
        $objPHPExcel->getActiveSheet()->mergeCells("H27:H33");
        $objPHPExcel->getActiveSheet()->getStyle("H27:H33")->applyFromArray($this->styleFuelTitle);
        $objPHPExcel->getActiveSheet()->getStyle("H27")->getAlignment()->setTextRotation(90);
        $objPHPExcel->getActiveSheet()->setCellValue("H27", "Fuel calc.");

        // merge row title cells
        for ($i = 28; $i <= 33; $i++)
            $objPHPExcel->getActiveSheet()->mergeCells("I" . $i . ":J" . $i);

        // col titles
        $objPHPExcel->getActiveSheet()->setCellValue("I27", "l/h:");
        $objPHPExcel->getActiveSheet()->getStyle("I27")->applyFromArray($this->styleFuelConsumptionTitle);
        $objPHPExcel->getActiveSheet()->setCellValue("K27", "Time");
        $objPHPExcel->getActiveSheet()->setCellValue("L27", "Fuel");
        $objPHPExcel->getActiveSheet()->getStyle("K27:L27")->applyFromArray($this->styleFuelColTitle);


        // row titles
        for ($i = 28; $i <= 33; $i++)
            $objPHPExcel->getActiveSheet()->getStyle("H27:H33")->applyFromArray($this->styleFuelTitle);

        $objPHPExcel->getActiveSheet()->setCellValue("I28", "Trip");
        $objPHPExcel->getActiveSheet()->setCellValue("I29", "Alternate");
        $objPHPExcel->getActiveSheet()->setCellValue("I30", "Reserve");
        $objPHPExcel->getActiveSheet()->setCellValue("I31", "Minimum");
        $objPHPExcel->getActiveSheet()->setCellValue("I32", "Extra fuel");
        $objPHPExcel->getActiveSheet()->setCellValue("I33", "Block fuel");
        $objPHPExcel->getActiveSheet()->getStyle("I28:J32")->applyFromArray($this->styleFuelRowTitle);
        $objPHPExcel->getActiveSheet()->getStyle("I33:J33")->applyFromArray($this->styleBlockFuelTitle);

        // consumption cell
        $consumptionString = $flightroute->aircraftConsumption ? $flightroute->aircraftConsumption->getLph() : "";
        $objPHPExcel->addNamedRange(new NamedRange('FUEL_CONSUMPTION', $objPHPExcel->getActiveSheet(), '=$J$27'));
        $objPHPExcel->getActiveSheet()->setCellValue("J27", $consumptionString);
        $objPHPExcel->getActiveSheet()->getStyle("J27")->applyFromArray($this->styleInputField);
    }


    private function createFuelContent(Spreadsheet $objPHPExcel, FuelCalc $fuelCalc): void {
        // time formulas
        for ($i = 28; $i <= 33; $i++) {
            $objPHPExcel->getActiveSheet()->getStyle("K" . $i)->getNumberFormat()->setFormatCode('hh:mm');
        }

        $extraTimeString = ($fuelCalc->extraTime && $fuelCalc->extraTime->getS() > 0) ? $fuelCalc->extraTime->getHourMinString() : "";
        $objPHPExcel->getActiveSheet()->setCellValue("K28", "=IF(TRIP_TIME<>\"\",1/24/60*TRIP_TIME,\"\")"); // trip
        $objPHPExcel->getActiveSheet()->setCellValue("K29", "=IF(ALTERNATE_TIME>0,1/24/60*ALTERNATE_TIME,\"\")"); // alternate
        $objPHPExcel->getActiveSheet()->setCellValue("K30", "=1/24/60*45"); // reserve
        $objPHPExcel->getActiveSheet()->setCellValue("K31", "=IF(AND(K28<>\"\",K29<>\"\"),SUM(K28:K30),\"\")"); // minimum
        $objPHPExcel->getActiveSheet()->setCellValue("K32", $extraTimeString); // extra
        $objPHPExcel->getActiveSheet()->setCellValue("K33", "=IF(K31<>\"\",SUM(K31:K32),\"\")"); // block


        // fuel formulas
        $objPHPExcel->getActiveSheet()->setCellValue("L28", $this->getFuelFormula(28)); // trip
        $objPHPExcel->getActiveSheet()->setCellValue("L29", $this->getFuelFormula(29)); // alternate
        $objPHPExcel->getActiveSheet()->setCellValue("L30", $this->getFuelFormula(30)); // reserve
        $objPHPExcel->getActiveSheet()->setCellValue("L31", "=IF(AND(L28<>\"\",L29<>\"\"),SUM(L28:L30),\"\")"); // minimum
        $objPHPExcel->getActiveSheet()->setCellValue("L32", $this->getFuelFormula(32)); // extra
        $objPHPExcel->getActiveSheet()->setCellValue("L33", "=IF(L31<>\"\",SUM(L31:L32),\"\")"); // block

        // fuel time/fuel style
        $objPHPExcel->getActiveSheet()->getStyle("K28:L33")->applyFromArray($this->styleFuelText);
        $objPHPExcel->getActiveSheet()->getStyle("K32")->applyFromArray($this->styleInputBackground);

        // fuel border
        $objPHPExcel->getActiveSheet()->getStyle("H27:L33")->applyFromArray($this->styleBorderThick);
    }


    private function getWpString(?Waypoint $wp, $key): string {
        if (!$wp) {
            return "";
        }

        return match ($key) {
            "freq" => $wp->frequency ?: "",
            "callsign" => $wp->callsign ?: "",
            "checkpoint" => $wp->checkpoint ?: "",
            "mtText" => $wp->mtText ?: "",
            "distText" => $wp->distText ?: "",
            "alt" => $wp->wpAltitude->altitude ? strval($wp->wpAltitude->altitude->getHeightAmsl()->getFt()) : "",
            "remark" => $wp->remark ?: "",
            default => "",
        };
    }


    function getPreEetFormula($row): string {
        return "=IF(GROUND_SPEED>0, ROUNDUP((E" . $row . "/GROUND_SPEED)*60, 0), 0)";
    }


    private function getEetFormula($row): string {
        return "=IF(G" . $row . " > 0, IF(D" . $row . " = \"VAC\", G" . $row . " & \"/+5\", G" . $row . "), IF((COUNTIF(G" . $row . ":G$22, \">0\")=0)*(G" . ($row - 1) . ">0), TRIP_TIME, \"\"))";
    }


    private function getFuelFormula($row): string {
        return "=IF(AND(FUEL_CONSUMPTION>0,K" . $row . "<>\"\"), ROUNDUP(FUEL_CONSUMPTION*K" . $row . "*24,0),\"\")";
    }
}
