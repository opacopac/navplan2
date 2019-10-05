<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Grib2Message;
use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionSection;
use Navplan\MeteoGrib2\Domain\Section5\IDataRepresentationTemplate;
use Navplan\MeteoGrib2\Domain\Section5\DataRepresentationSection;
use Navplan\MeteoGrib2\Domain\Section6\BitmapSection;
use Navplan\MeteoGrib2\Grib2Parser\Section0\Section0Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section1\Section1Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section2\Section2Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section3\Section3Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section4\Section4Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section5\Section5Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section6\Section6Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section7\Section7Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section8\Section8Parser;


class Grib2MessageParser {
    public const MAGIC_LENGTH_BYTES = 4;
    public const SECTION_NR_BYTES = 1;


    public static function parse($fileHandle): Grib2Message {
        $message = new Grib2Message();

        do {
            $lenOrMagic = self::readLengthOrMagic($fileHandle);
            if (!$message->getIndicatorSection() && $lenOrMagic !== Section0Parser::GRIB2_MAGIC) {
                throw new InvalidArgumentException('not a GRIB2 file');
            }
            $payloadLength = self::getPayloadLength($lenOrMagic);
            $sectionNr = self::readSectionNr($fileHandle, $lenOrMagic);
            $payloadData = self::readSectionData($fileHandle, $payloadLength);

            switch ($sectionNr) {
                case 0: $message->addIndicatorSection(Section0Parser::parse($payloadData)); break;
                case 1: $message->addIdentificationSection(Section1Parser::parse($payloadData)); break;
                case 2: $message->addLocalUseSection(Section2Parser::parse($payloadData)); break;
                case 3: $message->addGridDefinitionSection(Section3Parser::parse($payloadData)); break;
                case 4: $message->addProductDefinitionSection(Section4Parser::parse($payloadData)); break;
                case 5: $message->addDataRepresentationSection(Section5Parser::parse($payloadData)); break;
                case 6: $message->addBitmapSection(Section6Parser::parse($payloadData)); break;
                case 7: $message->addDataSection(
                    Section7Parser::parse(
                        self::getDataRepresentationTemplate($message),
                        $payloadData,
                        self::getValueCount($message),
                        self::getBitMap($message)
                    )
                ); break;
                case 8: $message->addEndSection(Section8Parser::parse()); break;
            }
        } while ($message->getEndSection() === NULL && !feof($fileHandle));

        return $message;
    }


    private static function readLengthOrMagic($fileHandle): string {
        return fread($fileHandle, self::MAGIC_LENGTH_BYTES);
    }


    private static function getPayloadLength(string $lenOrMagic): int {
        if ($lenOrMagic === Section0Parser::GRIB2_MAGIC) {
            return Section0Parser::LENGTH_BYTES - self::MAGIC_LENGTH_BYTES;
        } else if ($lenOrMagic === Section8Parser::GRIB2_FINAL_MAGIC) {
            return 0;
        } else {
            return unpack("N1a", $lenOrMagic)["a"] - self::MAGIC_LENGTH_BYTES - self::SECTION_NR_BYTES;
        }
    }


    private static function readSectionNr($fileHandle, string $lenOrMagic): int {
        if ($lenOrMagic === Section0Parser::GRIB2_MAGIC) {
            return 0;
        } else if ($lenOrMagic === Section8Parser::GRIB2_FINAL_MAGIC) {
            return 8;
        } else {
            $data = fread($fileHandle, self::SECTION_NR_BYTES);
            return unpack("C1a", $data)["a"];
        }
    }


    private static function readSectionData($fileHandle, $length): string {
        if ($length === 0) {
            return "";
        } else {
            return fread($fileHandle, $length);
        }
    }


    private static function getDataRepresentationTemplate(Grib2Message $message): ?IDataRepresentationTemplate {
        $sect5Count = count($message->getDataRepresentationSectionList());
        $sect5 = $message->getDataRepresentationSectionList()[$sect5Count - 1];

        if ($sect5 instanceof DataRepresentationSection) {
            return $sect5->getDataRepresentationTemplate();
        } else {
            return NULL;
        }
    }


    private static function getValueCount(Grib2Message $message): int {
        $sect3Count = count($message->getGridDefinitionSectionList());
        $sect3 = $message->getGridDefinitionSectionList()[$sect3Count - 1];

        if ($sect3 instanceof GridDefinitionSection) {
            return $sect3->getDataPointCount();
        } else {
            throw new InvalidArgumentException('error: unable to get data point count from section 3');
        }
    }


    private static function getBitMap(Grib2Message $message): ?array {
        $sect6Count = count($message->getBitmapSectionList());
        $sect6 = $message->getBitmapSectionList()[$sect6Count - 1];

        if ($sect6 instanceof BitmapSection) {
            return $sect6->getBitMap();
        } else {
            return NULL;
        }
    }
}
