<?php declare(strict_types=1);

namespace Navplan\Exporter\Builder;

use Navplan\Common\Domain\Model\Consumption;
use Navplan\Exporter\Pdf\PDF_Rotate;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Model\FuelCalc;
use Navplan\Flightroute\Domain\Model\Waypoint;


class NavplanPdfBuilder
{
    private const FONT_DIR = __DIR__ . "/../Pdf/Fonts/";

    private const PLAN_TITLE = "NAV-FLIGHTPLAN";
    private const MARGIN_X = 8;
    private const MARGIN_Y = 10;
    private const ROW_HEIGHT = 5.82;
    private const PLAN_WIDTH = 136.56;
    private const GEN_COL_WIDTHS = [52.92, 27, 27, 29.64];
    private const GEN1_COL_TITLES = ["ACFT IDENT:", "Date:", "Off Bl.:", "QNH:"];
    private const GEN2_COL_TITLES = ["Pilot:", "GS:", "Bl. on:", "RWY:"];
    private const CKP_COL_WIDTHS = [11.91, 9.26, 31.75, 9, 9, 9, 9, 9, 9, 29.64];
    private const CKP_COL_TITLES = ["Freq.", "C/S", "Checkpoint", "MT", "Dist.", "Alt.", "EET", "ETO", "ATO", "Remarks"];
    private const CKP_NUM = 18;
    private const CMT_COL_WIDTH = 79.92;
    private const CMT_NUM = 7;
    private const FUEL_TITLE = "Fuel calc.";
    private const FUEL_TITLE_COL_WIDTH = 9;
    private const FUEL_COL_WIDTH = [18, 14.82, 14.82];
    private const FUEL_COL_TITLE = ["l/h:", "Time", "Fuel"];
    private const FUEL_ROW_TITLE = ["Trip", "Alternate", "Reserve", "Minimum", "Extra fuel", "Block fuel"];
    private PDF_Rotate $pdf;


    public function __construct()
    {
    }


    /**
     * @param Flightroute $flightroute
     * @param FuelCalc $fuelCalc
     * @return PDF_Rotate
     */
    public function buildPdf(Flightroute $flightroute, FuelCalc $fuelCalc): PDF_Rotate
    {
        self::createDoc();
        self::createTitle();
        self::createGenericData($flightroute);
        self::createCheckpointHeaders();
        self::createCheckpointRows($flightroute->waypoinList);
        self::createAlternateRow($flightroute->alternate);
        $fuelTop = $this->pdf->GetY();
        self::createCommentLines($fuelTop, $flightroute->comments);
        self::createFuelTitle($fuelTop);
        $fuelLeft = $this->pdf->GetX();
        self::createFuelHeaders($flightroute->aircraftConsumption);
        self::createFuelEntries($fuelLeft, $fuelCalc);
        self::createFuelBorder($fuelTop);

        return $this->pdf;
    }


    private function createDoc(): void
    {
        $this->pdf = new PDF_Rotate('L', 'mm', 'A4');
        $this->pdf->SetTitle(self::PLAN_TITLE);
        $this->pdf->AddFont('Arial-Narrow', '', 'arial-narrow.php', self::FONT_DIR);
        $this->pdf->AddFont('ArialNarrow-Italic', 'I', 'ARIALNI.php', self::FONT_DIR);
        $this->pdf->AddPage();
        $this->pdf->SetAutoPageBreak(false);
        $this->pdf->SetMargins(self::MARGIN_X, self::MARGIN_Y);
        $this->pdf->SetLineWidth(0.1);
    }


    private function createTitle(): void
    {
        $this->pdf->SetY($this->pdf->GetY()); // move to right margin
        $this->pdf->SetFont('Arial', 'B', 16);
        $this->pdf->Cell(self::PLAN_WIDTH, self::ROW_HEIGHT * 2, self::PLAN_TITLE, "LTRB", 2, "C", false);
    }


    private function createGenericData(Flightroute $flightroute): void
    {
        $this->pdf->SetFont('Arial', 'B', 10);

        for ($i = 0; $i < count(self::GEN_COL_WIDTHS); $i++) {
            $this->pdf->Cell(self::GEN_COL_WIDTHS[$i], self::ROW_HEIGHT, self::GEN1_COL_TITLES[$i], "LTRB", 0);
        }

        $this->pdf->SetY($this->pdf->GetY() + self::ROW_HEIGHT); // new line

        for ($i = 0; $i < count(self::GEN_COL_WIDTHS); $i++) {
            $text = self::GEN2_COL_TITLES[$i];
            if ($i == 1) { // speed
                $text .= $flightroute->aircraftSpeed ? " " . $flightroute->aircraftSpeed->getKt() . "kt" : "";
            }

            $this->pdf->Cell(self::GEN_COL_WIDTHS[$i], self::ROW_HEIGHT, $text, "LTRB", 0);
        }

        self::createNewLine();
    }


    private function createCheckpointHeaders(): void
    {
        $this->pdf->SetLineWidth(0.3);
        $this->pdf->SetFillColor(160, 160, 160);

        for ($i = 0; $i < count(self::CKP_COL_WIDTHS); $i++) {
            $this->pdf->Cell(self::CKP_COL_WIDTHS[$i], self::ROW_HEIGHT, self::CKP_COL_TITLES[$i], "LTRB", 0, "", true);
        }

        self::createNewLine();
    }


    /**
     * @param Waypoint[] $waypoints
     */
    private function createCheckpointRows(array $waypoints): void
    {
        $this->pdf->SetLineWidth(0.1);
        $this->pdf->SetFont('Arial-Narrow', '', 10);
        $suppInfoCount = 0;

        for ($j = 0; $j + $suppInfoCount < self::CKP_NUM; $j++) {
            for ($i = 0; $i < count(self::CKP_COL_WIDTHS); $i++) {
                if ($i >= 3 && $i <= 8) {
                    $align = "C"; // align center
                } else {
                    $align = "L"; // align left
                }

                if ($j == 0 && ($i >= 3 && $i <= 7)) { // grey filled cells in first row
                    $this->pdf->Cell(self::CKP_COL_WIDTHS[$i], self::ROW_HEIGHT, "", "LTRB", 0, $align, true);
                } else {
                    $pos_x0 = $this->pdf->GetX();
                    $pos_y0 = $this->pdf->GetY();
                    $wp = $j < count($waypoints) ? $waypoints[$j] : null;
                    $value = self::getWaypointValue($wp, $i);
                    $this->pdf->Cell(self::CKP_COL_WIDTHS[$i], self::ROW_HEIGHT, $this->utf8_decode($value), "LTRB", 0, $align);
                    $pos_x1 = $this->pdf->GetX();
                    $pos_y1 = $this->pdf->GetY();

                    if ($i === 5) { // alt
                        self::drawMinMaxLines($wp, $pos_x0, $pos_y0, $pos_x1, $pos_y1);
                    }
                }
            }

            // opt. line for supp info string
            $suppInfoString = (isset($waypoints[$j]) && $waypoints[$j]->suppInfo) ? $this->utf8_decode($waypoints[$j]->suppInfo) : "";
            if (strlen($suppInfoString) > 0) {
                $identWidth = 4;
                $this->pdf->SetFont('ArialNarrow-Italic', 'I', 10);
                $this->pdf->SetY($this->pdf->GetY() + self::ROW_HEIGHT); // new line
                //$this->pdf->Cell($identWidth, $rowHeight, "", "LTRB", 0, "L"); // empty cell
                $this->pdf->Cell($identWidth, self::ROW_HEIGHT, "", "LTRB", 0, "L", true);
                //$this->pdf->SetX($pdf->GetX() + $identWidth);
                $wp = $j < count($waypoints) ? $waypoints[$j] : null;
                $value = self::getWaypointValue($wp, 10);
                $this->pdf->Cell(self::PLAN_WIDTH - $identWidth, self::ROW_HEIGHT, $suppInfoString, "LTRB", 0, "L"); // supp info
                $this->pdf->SetFont('Arial-Narrow', '', 10);

                $suppInfoCount++;
            }

            self::createNewLine();
        }
    }


    private function getWaypointValue(?Waypoint $waypoint, int $colIndex): string
    {
        if (!$waypoint) {
            return "";
        }

        return match ($colIndex) {
            0 => $waypoint->frequency ?: "", // freq
            1 => $waypoint->callsign ?: "", // callsign
            2 => $waypoint->checkpoint ?: "", // checkpoint
            3 => $waypoint->mtText ?: "", // mt
            4 => $waypoint->distText ?: "", // dist
            5 => $waypoint->wpAltitude->altitude ? $waypoint->wpAltitude->altitude->getHeightAmsl()->getFt() . "" : "", // alt
            6 => $waypoint->eetText ?: "", // eet
            7 => "", // eto
            8 => "", // ato
            9 => $waypoint->remark ?: "", // remark
            10 => $waypoint->suppInfo ?: "", // supp info
            default => "",
        };
    }


    private function drawMinMaxLines(?Waypoint $waypoint, $pos_x0, $pos_y0, $pos_x1, $pos_y1)
    {
        if (!$waypoint) {
            return;
        }

        if ($waypoint->wpAltitude->isMinAlt) {
            $this->pdf->Line($pos_x0 + 1, $pos_y0 + 4.9, $pos_x1 - 1, $pos_y1 + 4.9);
        }

        if ($waypoint->wpAltitude->isMaxAlt) {
            $this->pdf->Line($pos_x0 + 1, $pos_y0 + 0.75, $pos_x1 - 1, $pos_y1 + 0.75);
        }

        if ($waypoint->wpAltitude->isAltAtLegStart) {
            $this->pdf->Line($pos_x0 + 0.5, $pos_y0 + 0.75, $pos_x0 + 0.5, $pos_y0 + 4.9);
        }
    }


    private function createAlternateRow(?Waypoint $alternate): void
    {
        // title row
        for ($i = 0; $i < count(self::CKP_COL_WIDTHS); $i++) {
            $this->pdf->SetFont('Arial-Narrow', 'U', 10);

            if ($i == 2) {
                $this->pdf->Cell(self::CKP_COL_WIDTHS[$i], self::ROW_HEIGHT, "Alternate:", "LTRB", 0);
            } else {
                $this->pdf->Cell(self::CKP_COL_WIDTHS[$i], self::ROW_HEIGHT, "", "LTRB", 0);
            }
        }

        self::createNewLine();

        // alternate waypoint row
        $this->pdf->SetFont('Arial-Narrow', '', 10);

        for ($i = 0; $i < count(self::CKP_COL_WIDTHS); $i++) {
            if ($i >= 3 && $i <= 8) {
                $align = "C"; // align center
            } else {
                $align = "L"; // align left
            }

            if ($alternate) {
                $value = self::getWaypointValue($alternate, $i);
                $this->pdf->Cell(self::CKP_COL_WIDTHS[$i], self::ROW_HEIGHT, $this->utf8_decode($value), "LTRB", 0, $align);
            } else {
                $this->pdf->Cell(self::CKP_COL_WIDTHS[$i], self::ROW_HEIGHT, "", "LTRB", 0);
            }
        }

        self::createNewLine();
    }


    private function createCommentLines($fuelTop, string|null $comments): void
    {
        for ($i = 0; $i < self::CMT_NUM; $i++) {
            $this->pdf->Cell(self::CMT_COL_WIDTH, self::ROW_HEIGHT, "", "LTRB", 2);
        }

        if ($comments) {
            $this->pdf->SetY($fuelTop);
            $this->pdf->MultiCell(self::CMT_COL_WIDTH, self::ROW_HEIGHT, $comments, "0", "L", false);
        }
    }


    private function createFuelTitle($fuelTop): void
    {
        $this->pdf->SetXY(self::CMT_COL_WIDTH + self::MARGIN_X, $fuelTop);
        $this->pdf->Cell(self::FUEL_TITLE_COL_WIDTH, self::ROW_HEIGHT * self::CMT_NUM, "", 0, 0, "", true);
        $this->pdf->SetFont('Arial', 'B', 11);
        $this->pdf->RotatedText(94, 185, self::FUEL_TITLE, 90);
    }


    private function createFuelHeaders(Consumption|null $aircraftConsumption): void
    {
        $fuelString = $aircraftConsumption ? $aircraftConsumption->getLph() : "";
        $this->pdf->SetFont('Arial', 'B', 10);
        $this->pdf->Cell(self::FUEL_COL_WIDTH[0], self::ROW_HEIGHT, self::FUEL_COL_TITLE[0] . $fuelString, "LTRB", 0, "L"); // l/h
        $this->pdf->Cell(self::FUEL_COL_WIDTH[1], self::ROW_HEIGHT, self::FUEL_COL_TITLE[1], "LTRB", 0, "C", true); // time title
        $this->pdf->Cell(self::FUEL_COL_WIDTH[2], self::ROW_HEIGHT, self::FUEL_COL_TITLE[2], "LTRB", 0, "C", true); // fuel title
    }


    private function createFuelEntries($fuelLeft, FuelCalc $fuelCalc): void
    {
        for ($j = 0; $j < count(self::FUEL_ROW_TITLE); $j++) {
            $this->pdf->SetXY($fuelLeft, $this->pdf->GetY() + self::ROW_HEIGHT); // new line

            $this->pdf->SetFont('Arial-Narrow', '', 10);
            $this->pdf->Cell(self::FUEL_COL_WIDTH[0], self::ROW_HEIGHT, self::FUEL_ROW_TITLE[$j], "LTRB", 0, "L"); // row title

            $this->pdf->SetFont('Arial', '', 10);
            $time = match ($j) {
                0 => $fuelCalc->tripTime,
                1 => $fuelCalc->alternateTime,
                2 => $fuelCalc->reserveTime,
                3 => $fuelCalc->minimumTime,
                4 => $fuelCalc->extraTime,
                5 => $fuelCalc->blockTime,
                default => null,
            };
            $timeStr = $time ? $time->getHourMinString() : "";
            $this->pdf->Cell(self::FUEL_COL_WIDTH[1], self::ROW_HEIGHT, $timeStr, "LTRB", 0, "C"); // time

            $consumption = match ($j) {
                0 => $fuelCalc->tripVolume,
                1 => $fuelCalc->alternateVolume,
                2 => $fuelCalc->reserveVolume,
                3 => $fuelCalc->minimumVolume,
                4 => $fuelCalc->extraVolume,
                5 => $fuelCalc->blockVolume,
                default => null,
            };
            $consumptionStr = $consumption ? $consumption->getL() : "";
            $this->pdf->Cell(self::FUEL_COL_WIDTH[2], self::ROW_HEIGHT, $consumptionStr, "LTRB", 0, "C"); // fuel
        }
    }


    private function createFuelBorder($fuelTop): void
    {
        $this->pdf->SetXY(self::CMT_COL_WIDTH + self::MARGIN_X, $fuelTop);
        $this->pdf->SetLineWidth(0.3);
        $this->pdf->Cell(self::PLAN_WIDTH - self::CMT_COL_WIDTH, self::ROW_HEIGHT * self::CMT_NUM, "", "LTRB");
    }


    private function createNewLine(): void
    {
        $this->pdf->SetY($this->pdf->GetY() + self::ROW_HEIGHT);
    }


    private function utf8_decode(string $text): string
    {
        return mb_convert_encoding($text, 'ISO-8859-1', 'UTF-8');
    }
}
