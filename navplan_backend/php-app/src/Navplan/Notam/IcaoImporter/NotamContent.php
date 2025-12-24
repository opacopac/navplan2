<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;


use Navplan\Common\StringNumberHelper;

class NotamContent
{
    private const string KEY_ID = "id";
    private const string KEY_ENTITY = "entity";
    private const string KEY_STATUS = "status";
    private const string KEY_QCODE = "Qcode";
    private const string KEY_AREA = "Area";
    private const string KEY_SUBAREA = "SubArea";
    private const string KEY_CONDITION = "Condition";
    private const string KEY_SUBJECT = "Subject";
    private const string KEY_MODIFIER = "Modifier";
    private const string KEY_MESSAGE = "message";
    private const string KEY_STARTDATE = "startdate";
    private const string KEY_ENDDATE = "enddate";
    private const string KEY_ALL = "all";
    private const string KEY_LOCATION = "location";
    private const string KEY_IS_ICAO = "isICAO";
    private const string KEY_CREATED = "Created";
    private const string KEY_KEY = "key";
    private const string KEY_TYPE = "type";
    private const string KEY_STATE_CODE = "StateCode";
    private const string KEY_STATE_NAME = "StateName";


    public function __construct(
        public int $id,            // ID of the NOTAM
        public ?string $entity,    // First 2 letters of the Q-code, if available
        public ?string $status,    // Last 2 letters of the Q-code, if available
        public ?string $qcode,     // Q-code of the NOTAM, if available
        public ?string $area,      // Decoded category first 2 letters of the Q-code
        public ?string $subarea,   // Decoded area of first 2 letters of the Q-code
        public ?string $condition, // Decoded sub-area of first 2 letters of the Q-code
        public ?string $subject,   // Decoded area of last 2 letters of the Q-code
        public ?string $modifier,  // Decoded sub-area of last 2 letters of the Q-code
        public ?string $message,   // Message part of the NOTAM, if available
        public string $startdate,  // Start datatime of the NOTAM
        public string $enddate,    // End datatime of the NOTAM, 100 years after startdate for permanent (PERM) notams
        public string $all,        // Full NOTAM
        public string $location,   // ICAO code of the location the NOTAM applies to
        public bool $isICAO,       // If the NOTAM is compliant with Doc ABC. If false, no Q-code decoding is available
        public string $created,    // Dattime the NOTAM was created
        public string $key,        // Concatenation of ID and Location to form unique id for all NOTAMS
        public string $type,       // Location type, either airspace or airport
        public string $stateCode,  // ISO 3-Letter code of the State
        public string $stateName,  // Name of the State
    ) {
    }


    public static function fromJson(string $json): NotamContent
    {
        $content = json_decode($json, true, JSON_NUMERIC_CHECK);

        return new NotamContent(
            StringNumberHelper::parseIntOrError($content, self::KEY_ID),
            $content[self::KEY_ENTITY],
            $content[self::KEY_STATUS],
            $content[self::KEY_QCODE],
            $content[self::KEY_AREA],
            $content[self::KEY_SUBAREA],
            $content[self::KEY_CONDITION],
            $content[self::KEY_SUBJECT],
            $content[self::KEY_MODIFIER],
            $content[self::KEY_MESSAGE],
            $content[self::KEY_STARTDATE],
            $content[self::KEY_ENDDATE],
            $content[self::KEY_ALL],
            $content[self::KEY_LOCATION],
            StringNumberHelper::parseBoolOrFalse($content, self::KEY_IS_ICAO),
            $content[self::KEY_CREATED],
            $content[self::KEY_KEY],
            $content[self::KEY_TYPE],
            $content[self::KEY_STATE_CODE],
            $content[self::KEY_STATE_NAME],
        );
    }
}
