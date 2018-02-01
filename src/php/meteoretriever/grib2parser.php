<?php
include_once "../helper.php";
include_once "../logger.php";
include_once "../grib2/grib2Message.php";


$inputFile = "./ICON_EU_pressure_level_elements_CLC_2018012812_000.grib2";
$inputFile = "./ICON_EU_pressure_level_elements_CLC_2018012121_030.grib2";
$inputFile = "./ICON_EU_single_level_elements_CLCL_2018012821_030.grib2";
$inputFile = "./COSMODE_org_single_level_elements_CLCL_2018012821_014.grib2";
$gribParser = new Grib2Parser($inputFile);
$gribParser->parse();


class Grib2Parser {
    private $logger;
    private $inputFileName;
    public $gribMessages = [];
    private $imgFilenameBase = "gribImgTest"; // TODO


    //region CONSTRUCTOR / DESTRUCTOR

    function __construct($inputFileName)
    {
        $this->logger = new Logger(NULL);
        $this->inputFileName = $inputFileName;
    }


    function __destruct()
    {
        $this->logger->closeLog();
    }

    //endregion


    public function parse() {
        $fileSize = filesize($this->inputFileName);
        $fileHandle = fopen($this->inputFileName, "rb");
        $gribMsgNum = 1;

        do {
            $gribMsg = new Grib2Message();
            $gribMsg->parse($fileHandle, $this->imgFilenameBase . "_" . $gribMsgNum . ".png");
            $this->gribMessages[] = $gribMsg;
            $gribMsgNum++;

            // TODO: temp
            $this->printKeyValuesToHtml($gribMsg->getDescription());
            print "<br><br>\n";
        } while (!feof($fileHandle) && ftell($fileHandle) < $fileSize - 1);

        fclose($fileHandle);
    }


    // TODO: TEMP
    private function printKeyValuesToHtml($array) {
        echo "<table>";
        foreach ($array as $key => $value) {
            echo "<tr><td>" . $key . ":</td><td>";
            if (is_array($value)) {
                $this->printKeyValuesToHtml($value);
            } else {
                echo $value;
            }

            echo "</td></tr>";
        }
        echo "</table>";
    }
}
