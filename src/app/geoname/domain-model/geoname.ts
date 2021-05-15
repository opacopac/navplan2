import {DataItem, DataItemType} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {Length} from '../../common/geo-math/domain-model/quantities/length';
import {StringnumberHelper} from '../../system/domain-service/stringnumber/stringnumber-helper';


// region description strings

const GEONAME_FEATURE_DESCRIPTION = {
    'A.ADM1': 'first-order administrative division',
    'A.ADM1H': 'historical first-order administrative division',
    'A.ADM2': 'second-order administrative division',
    'A.ADM2H': 'historical second-order administrative division',
    'A.ADM3': 'third-order administrative division',
    'A.ADM3H': 'historical third-order administrative division',
    'A.ADM4': 'fourth-order administrative division',
    'A.ADM4H': 'historical fourth-order administrative division',
    'A.ADM5': 'fifth-order administrative division',
    'A.ADMD': 'administrative division',
    'A.ADMDH': 'historical administrative division ',
    'A.LTER': 'leased area',
    'A.PCL': 'political entity',
    'A.PCLD': 'dependent political entity',
    'A.PCLF': 'freely associated state',
    'A.PCLH': 'historical political entity',
    'A.PCLI': 'independent political entity',
    'A.PCLIX': 'section of independent political entity',
    'A.PCLS': 'semi-independent political entity',
    'A.PRSH': 'parish',
    'A.TERR': 'territory',
    'A.ZN': 'zone',
    'A.ZNB': 'buffer zone',
    'H.AIRS': 'seaplane landing area',
    'H.ANCH': 'anchorage',
    'H.BAY': 'bay',
    'H.BAYS': 'bays',
    'H.BGHT': 'bight(s)',
    'H.BNK': 'bank(s)',
    'H.BNKR': 'stream bank',
    'H.BNKX': 'section of bank',
    'H.BOG': 'bog(s)',
    'H.CAPG': 'icecap',
    'H.CHN': 'channel',
    'H.CHNL': 'lake channel(s)',
    'H.CHNM': 'marine channel',
    'H.CHNN': 'navigation channel',
    'H.CNFL': 'confluence',
    'H.CNL': 'canal',
    'H.CNLA': 'aqueduct',
    'H.CNLB': 'canal bend',
    'H.CNLD': 'drainage canal',
    'H.CNLI': 'irrigation canal',
    'H.CNLN': 'navigation canal(s)',
    'H.CNLQ': 'abandoned canal',
    'H.CNLSB': 'underground irrigation canal(s)',
    'H.CNLX': 'section of canal',
    'H.COVE': 'cove(s)',
    'H.CRKT': 'tidal creek(s)',
    'H.CRNT': 'current',
    'H.CUTF': 'cutoff',
    'H.DCK': 'dock(s)',
    'H.DCKB': 'docking basin',
    'H.DOMG': 'icecap dome',
    'H.DPRG': 'icecap depression',
    'H.DTCH': 'ditch',
    'H.DTCHD': 'drainage ditch',
    'H.DTCHI': 'irrigation ditch',
    'H.DTCHM': 'ditch mouth(s)',
    'H.ESTY': 'estuary',
    'H.FISH': 'fishing area',
    'H.FJD': 'fjord',
    'H.FJDS': 'fjords',
    'H.FLLS': 'waterfall(s)',
    'H.FLLSX': 'section of waterfall(s)',
    'H.FLTM': 'mud flat(s)',
    'H.FLTT': 'tidal flat(s)',
    'H.GLCR': 'glacier(s)',
    'H.GULF': 'gulf',
    'H.GYSR': 'geyser',
    'H.HBR': 'harbor(s)',
    'H.HBRX': 'section of harbor',
    'H.INLT': 'inlet',
    'H.INLTQ': 'former inlet',
    'H.LBED': 'lake bed(s)',
    'H.LGN': 'lagoon',
    'H.LGNS': 'lagoons',
    'H.LGNX': 'section of lagoon',
    'H.LK': 'lake',
    'H.LKC': 'crater lake',
    'H.LKI': 'intermittent lake',
    'H.LKN': 'salt lake',
    'H.LKNI': 'intermittent salt lake',
    'H.LKO': 'oxbow lake',
    'H.LKOI': 'intermittent oxbow lake',
    'H.LKS': 'lakes',
    'H.LKSB': 'underground lake',
    'H.LKSC': 'crater lakes',
    'H.LKSI': 'intermittent lakes',
    'H.LKSN': 'salt lakes',
    'H.LKSNI': 'intermittent salt lakes',
    'H.LKX': 'section of lake',
    'H.MFGN': 'salt evaporation ponds',
    'H.MGV': 'mangrove swamp',
    'H.MOOR': 'moor(s)',
    'H.MRSH': 'marsh(es)',
    'H.MRSHN': 'salt marsh',
    'H.NRWS': 'narrows',
    'H.OCN': 'ocean',
    'H.OVF': 'overfalls',
    'H.PND': 'pond',
    'H.PNDI': 'intermittent pond',
    'H.PNDN': 'salt pond',
    'H.PNDNI': 'intermittent salt pond(s)',
    'H.PNDS': 'ponds',
    'H.PNDSF': 'fishponds',
    'H.PNDSI': 'intermittent ponds',
    'H.PNDSN': 'salt ponds',
    'H.POOL': 'pool(s)',
    'H.POOLI': 'intermittent pool',
    'H.RCH': 'reach',
    'H.RDGG': 'icecap ridge',
    'H.RDST': 'roadstead',
    'H.RF': 'reef(s)',
    'H.RFC': 'coral reef(s)',
    'H.RFX': 'section of reef',
    'H.RPDS': 'rapids',
    'H.RSV': 'reservoir(s)',
    'H.RSVI': 'intermittent reservoir',
    'H.RSVT': 'water tank',
    'H.RVN': 'ravine(s)',
    'H.SBKH': 'sabkha(s)',
    'H.SD': 'sound',
    'H.SEA': 'sea',
    'H.SHOL': 'shoal(s)',
    'H.SILL': 'sill',
    'H.SPNG': 'spring(s)',
    'H.SPNS': 'sulphur spring(s)',
    'H.SPNT': 'hot spring(s)',
    'H.STM': 'stream',
    'H.STMA': 'anabranch',
    'H.STMB': 'stream bend',
    'H.STMC': 'canalized stream',
    'H.STMD': 'distributary(-ies)',
    'H.STMH': 'headwaters',
    'H.STMI': 'intermittent stream',
    'H.STMIX': 'section of intermittent stream',
    'H.STMM': 'stream mouth(s)',
    'H.STMQ': 'abandoned watercourse',
    'H.STMS': 'streams',
    'H.STMSB': 'lost river',
    'H.STMX': 'section of stream',
    'H.STRT': 'strait',
    'H.SWMP': 'swamp',
    'H.SYSI': 'irrigation system',
    'H.TNLC': 'canal tunnel',
    'H.WAD': 'wadi',
    'H.WADB': 'wadi bend',
    'H.WADJ': 'wadi junction',
    'H.WADM': 'wadi mouth',
    'H.WADS': 'wadies',
    'H.WADX': 'section of wadi',
    'H.WHRL': 'whirlpool',
    'H.WLL': 'well',
    'H.WLLQ': 'abandoned well',
    'H.WLLS': 'wells',
    'H.WTLD': 'wetland',
    'H.WTLDI': 'intermittent wetland',
    'H.WTRC': 'watercourse',
    'H.WTRH': 'waterhole(s)',
    'L.AGRC': 'agricultural colony',
    'L.AMUS': 'amusement park',
    'L.AREA': 'area',
    'L.BSND': 'drainage basin',
    'L.BSNP': 'petroleum basin',
    'L.BTL': 'battlefield',
    'L.CLG': 'clearing',
    'L.CMN': 'common',
    'L.CNS': 'concession area',
    'L.COLF': 'coalfield',
    'L.CONT': 'continent',
    'L.CST': 'coast',
    'L.CTRB': 'business center',
    'L.DEVH': 'housing development',
    'L.FLD': 'field(s)',
    'L.FLDI': 'irrigated field(s)',
    'L.GASF': 'gasfield',
    'L.GRAZ': 'grazing area',
    'L.GVL': 'gravel area',
    'L.INDS': 'industrial area',
    'L.LAND': 'arctic land',
    'L.LCTY': 'locality',
    'L.MILB': 'military base',
    'L.MNA': 'mining area',
    'L.MVA': 'maneuver area',
    'L.NVB': 'naval base',
    'L.OAS': 'oasis(-es)',
    'L.OILF': 'oilfield',
    'L.PEAT': 'peat cutting area',
    'L.PRK': 'park',
    'L.PRT': 'port',
    'L.QCKS': 'quicksand',
    'L.RES': 'reserve',
    'L.RESA': 'agricultural reserve',
    'L.RESF': 'forest reserve',
    'L.RESH': 'hunting reserve',
    'L.RESN': 'nature reserve',
    'L.RESP': 'palm tree reserve',
    'L.RESV': 'reservation',
    'L.RESW': 'wildlife reserve',
    'L.RGN': 'region',
    'L.RGNE': 'economic region',
    'L.RGNH': 'historical region',
    'L.RGNL': 'lake region',
    'L.RNGA': 'artillery range',
    'L.SALT': 'salt area',
    'L.SNOW': 'snowfield',
    'L.TRB': 'tribal area',
    'P.PPL': 'populated place',
    'P.PPLA': 'seat of a first-order administrative division',
    'P.PPLA2': 'seat of a second-order administrative division',
    'P.PPLA3': 'seat of a third-order administrative division',
    'P.PPLA4': 'seat of a fourth-order administrative division',
    'P.PPLC': 'capital of a political entity',
    'P.PPLCH': 'historical capital of a political entity',
    'P.PPLF': 'farm village',
    'P.PPLG': 'seat of government of a political entity',
    'P.PPLH': 'historical populated place',
    'P.PPLL': 'populated locality',
    'P.PPLQ': 'abandoned populated place',
    'P.PPLR': 'religious populated place',
    'P.PPLS': 'populated places',
    'P.PPLW': 'destroyed populated place',
    'P.PPLX': 'section of populated place',
    'P.STLMT': 'israeli settlement',
    'R.CSWY': 'causeway',
    'R.OILP': 'oil pipeline',
    'R.PRMN': 'promenade',
    'R.PTGE': 'portage',
    'R.RD': 'road',
    'R.RDA': 'ancient road',
    'R.RDB': 'road bend',
    'R.RDCUT': 'road cut',
    'R.RDJCT': 'road junction',
    'R.RJCT': 'railroad junction',
    'R.RR': 'railroad',
    'R.RRQ': 'abandoned railroad',
    'R.RTE': 'caravan route',
    'R.RYD': 'railroad yard',
    'R.ST': 'street',
    'R.STKR': 'stock route',
    'R.TNL': 'tunnel',
    'R.TNLN': 'natural tunnel',
    'R.TNLRD': 'road tunnel',
    'R.TNLRR': 'railroad tunnel',
    'R.TNLS': 'tunnels',
    'R.TRL': 'trail',
    'S.ADMF': 'administrative facility',
    'S.AGRF': 'agricultural facility',
    'S.AIRB': 'airbase',
    'S.AIRF': 'airfield',
    'S.AIRH': 'heliport',
    'S.AIRP': 'airport',
    'S.AIRQ': 'abandoned airfield',
    'S.AMTH': 'amphitheater',
    'S.ANS': 'ancient site',
    'S.AQC': 'aquaculture facility',
    'S.ARCH': 'arch',
    'S.ASTR': 'astronomical station',
    'S.ASYL': 'asylum',
    'S.ATHF': 'athletic field',
    'S.ATM': 'automatic teller machine',
    'S.BANK': 'bank',
    'S.BCN': 'beacon',
    'S.BDG': 'bridge',
    'S.BDGQ': 'ruined bridge',
    'S.BLDG': 'building(s)',
    'S.BLDO': 'office building',
    'S.BP': 'boundary marker',
    'S.BRKS': 'barracks',
    'S.BRKW': 'breakwater',
    'S.BSTN': 'baling station',
    'S.BTYD': 'boatyard',
    'S.BUR': 'burial cave(s)',
    'S.BUSTN': 'bus station',
    'S.BUSTP': 'bus stop',
    'S.CARN': 'cairn',
    'S.CAVE': 'cave(s)',
    'S.CH': 'church',
    'S.CMP': 'camp(s)',
    'S.CMPL': 'logging camp',
    'S.CMPLA': 'labor camp',
    'S.CMPMN': 'mining camp',
    'S.CMPO': 'oil camp',
    'S.CMPQ': 'abandoned camp',
    'S.CMPRF': 'refugee camp',
    'S.CMTY': 'cemetery',
    'S.COMC': 'communication center',
    'S.CRRL': 'corral(s)',
    'S.CSNO': 'casino',
    'S.CSTL': 'castle',
    'S.CSTM': 'customs house',
    'S.CTHSE': 'courthouse',
    'S.CTRA': 'atomic center',
    'S.CTRCM': 'community center',
    'S.CTRF': 'facility center',
    'S.CTRM': 'medical center',
    'S.CTRR': 'religious center',
    'S.CTRS': 'space center',
    'S.CVNT': 'convent',
    'S.DAM': 'dam',
    'S.DAMQ': 'ruined dam',
    'S.DAMSB': 'sub-surface dam',
    'S.DARY': 'dairy',
    'S.DCKD': 'dry dock',
    'S.DCKY': 'dockyard',
    'S.DIKE': 'dike',
    'S.DIP': 'diplomatic facility',
    'S.DPOF': 'fuel depot',
    'S.EST': 'estate(s)',
    'S.ESTO': 'oil palm plantation',
    'S.ESTR': 'rubber plantation',
    'S.ESTSG': 'sugar plantation',
    'S.ESTT': 'tea plantation',
    'S.ESTX': 'section of estate',
    'S.FCL': 'facility',
    'S.FNDY': 'foundry',
    'S.FRM': 'farm',
    'S.FRMQ': 'abandoned farm',
    'S.FRMS': 'farms',
    'S.FRMT': 'farmstead',
    'S.FT': 'fort',
    'S.FY': 'ferry',
    'S.GATE': 'gate',
    'S.GDN': 'garden(s)',
    'S.GHAT': 'ghat',
    'S.GHSE': 'guest house',
    'S.GOSP': 'gas-oil separator plant',
    'S.GOVL': 'local government office',
    'S.GRVE': 'grave',
    'S.HERM': 'hermitage',
    'S.HLT': 'halting place',
    'S.HMSD': 'homestead',
    'S.HSE': 'house(s)',
    'S.HSEC': 'country house',
    'S.HSP': 'hospital',
    'S.HSPC': 'clinic',
    'S.HSPD': 'dispensary',
    'S.HSPL': 'leprosarium',
    'S.HSTS': 'historical site',
    'S.HTL': 'hotel',
    'S.HUT': 'hut',
    'S.HUTS': 'huts',
    'S.INSM': 'military installation',
    'S.ITTR': 'research institute',
    'S.JTY': 'jetty',
    'S.LDNG': 'landing',
    'S.LEPC': 'leper colony',
    'S.LIBR': 'library',
    'S.LNDF': 'landfill',
    'S.LOCK': 'lock(s)',
    'S.LTHSE': 'lighthouse',
    'S.MALL': 'mall',
    'S.MAR': 'marina',
    'S.MFG': 'factory',
    'S.MFGB': 'brewery',
    'S.MFGC': 'cannery',
    'S.MFGCU': 'copper works',
    'S.MFGLM': 'limekiln',
    'S.MFGM': 'munitions plant',
    'S.MFGPH': 'phosphate works',
    'S.MFGQ': 'abandoned factory',
    'S.MFGSG': 'sugar refinery',
    'S.MKT': 'market',
    'S.ML': 'mill(s)',
    'S.MLM': 'ore treatment plant',
    'S.MLO': 'olive oil mill',
    'S.MLSG': 'sugar mill',
    'S.MLSGQ': 'former sugar mill',
    'S.MLSW': 'sawmill',
    'S.MLWND': 'windmill',
    'S.MLWTR': 'water mill',
    'S.MN': 'mine(s)',
    'S.MNAU': 'gold mine(s)',
    'S.MNC': 'coal mine(s)',
    'S.MNCR': 'chrome mine(s)',
    'S.MNCU': 'copper mine(s)',
    'S.MNFE': 'iron mine(s)',
    'S.MNMT': 'monument',
    'S.MNN': 'salt mine(s)',
    'S.MNQ': 'abandoned mine',
    'S.MNQR': 'quarry(-ies)',
    'S.MOLE': 'mole',
    'S.MSQE': 'mosque',
    'S.MSSN': 'mission',
    'S.MSSNQ': 'abandoned mission',
    'S.MSTY': 'monastery',
    'S.MTRO': 'metro station',
    'S.MUS': 'museum',
    'S.NOV': 'novitiate',
    'S.NSY': 'nursery(-ies)',
    'S.OBPT': 'observation point',
    'S.OBS': 'observatory',
    'S.OBSR': 'radio observatory',
    'S.OILJ': 'oil pipeline junction',
    'S.OILQ': 'abandoned oil well',
    'S.OILR': 'oil refinery',
    'S.OILT': 'tank farm',
    'S.OILW': 'oil well',
    'S.OPRA': 'opera house',
    'S.PAL': 'palace',
    'S.PGDA': 'pagoda',
    'S.PIER': 'pier',
    'S.PKLT': 'parking lot',
    'S.PMPO': 'oil pumping station',
    'S.PMPW': 'water pumping station',
    'S.PO': 'post office',
    'S.PP': 'police post',
    'S.PPQ': 'abandoned police post',
    'S.PRKGT': 'park gate',
    'S.PRKHQ': 'park headquarters',
    'S.PRN': 'prison',
    'S.PRNJ': 'reformatory',
    'S.PRNQ': 'abandoned prison',
    'S.PS': 'power station',
    'S.PSH': 'hydroelectric power station',
    'S.PSTB': 'border post',
    'S.PSTC': 'customs post',
    'S.PSTP': 'patrol post',
    'S.PYR': 'pyramid',
    'S.PYRS': 'pyramids',
    'S.QUAY': 'quay',
    'S.RDCR': 'traffic circle',
    'S.RECG': 'golf course',
    'S.RECR': 'racetrack',
    'S.REST': 'restaurant',
    'S.RET': 'store',
    'S.RHSE': 'resthouse',
    'S.RKRY': 'rookery',
    'S.RLG': 'religious site',
    'S.RLGR': 'retreat',
    'S.RNCH': 'ranch(es)',
    'S.RSD': 'railroad siding',
    'S.RSGNL': 'railroad signal',
    'S.RSRT': 'resort',
    'S.RSTN': 'railroad station',
    'S.RSTNQ': 'abandoned railroad station',
    'S.RSTP': 'railroad stop',
    'S.RSTPQ': 'abandoned railroad stop',
    'S.RUIN': 'ruin(s)',
    'S.SCH': 'school',
    'S.SCHA': 'agricultural school',
    'S.SCHC': 'college',
    'S.SCHL': 'language school',
    'S.SCHM': 'military school',
    'S.SCHN': 'maritime school',
    'S.SCHT': 'technical school',
    'S.SECP': 'State Exam Prep Centre',
    'S.SHPF': 'sheepfold',
    'S.SHRN': 'shrine',
    'S.SHSE': 'storehouse',
    'S.SLCE': 'sluice',
    'S.SNTR': 'sanatorium',
    'S.SPA': 'spa',
    'S.SPLY': 'spillway',
    'S.SQR': 'square',
    'S.STBL': 'stable',
    'S.STDM': 'stadium',
    'S.STNB': 'scientific research base',
    'S.STNC': 'coast guard station',
    'S.STNE': 'experiment station',
    'S.STNF': 'forest station',
    'S.STNI': 'inspection station',
    'S.STNM': 'meteorological station',
    'S.STNR': 'radio station',
    'S.STNS': 'satellite station',
    'S.STNW': 'whaling station',
    'S.STPS': 'steps',
    'S.SWT': 'sewage treatment plant',
    'S.THTR': 'theater',
    'S.TMB': 'tomb(s)',
    'S.TMPL': 'temple(s)',
    'S.TNKD': 'cattle dipping tank',
    'S.TOWR': 'tower',
    'S.TRANT': 'transit terminal',
    'S.TRIG': 'triangulation station',
    'S.TRMO': 'oil pipeline terminal',
    'S.TWO': 'temp work office',
    'S.UNIP': 'university prep school',
    'S.UNIV': 'university',
    'S.USGE': 'united states government establishment',
    'S.VETF': 'veterinary facility',
    'S.WALL': 'wall',
    'S.WALLA': 'ancient wall',
    'S.WEIR': 'weir(s)',
    'S.WHRF': 'wharf(-ves)',
    'S.WRCK': 'wreck',
    'S.WTRW': 'waterworks',
    'S.ZNF': 'free trade zone',
    'S.ZOO': 'zoo',
    'T.ASPH': 'asphalt lake',
    'T.ATOL': 'atoll(s)',
    'T.BAR': 'bar',
    'T.BCH': 'beach',
    'T.BCHS': 'beaches',
    'T.BDLD': 'badlands',
    'T.BLDR': 'boulder field',
    'T.BLHL': 'blowhole(s)',
    'T.BLOW': 'blowout(s)',
    'T.BNCH': 'bench',
    'T.BUTE': 'butte(s)',
    'T.CAPE': 'cape',
    'T.CFT': 'cleft(s)',
    'T.CLDA': 'caldera',
    'T.CLF': 'cliff(s)',
    'T.CNYN': 'canyon',
    'T.CONE': 'cone(s)',
    'T.CRDR': 'corridor',
    'T.CRQ': 'cirque',
    'T.CRQS': 'cirques',
    'T.CRTR': 'crater(s)',
    'T.CUET': 'cuesta(s)',
    'T.DLTA': 'delta',
    'T.DPR': 'depression(s)',
    'T.DSRT': 'desert',
    'T.DUNE': 'dune(s)',
    'T.DVD': 'divide',
    'T.ERG': 'sandy desert',
    'T.FAN': 'fan(s)',
    'T.FORD': 'ford',
    'T.FSR': 'fissure',
    'T.GAP': 'gap',
    'T.GRGE': 'gorge(s)',
    'T.HDLD': 'headland',
    'T.HLL': 'hill',
    'T.HLLS': 'hills',
    'T.HMCK': 'hammock(s)',
    'T.HMDA': 'rock desert',
    'T.INTF': 'interfluve',
    'T.ISL': 'island',
    'T.ISLET': 'islet',
    'T.ISLF': 'artificial island',
    'T.ISLM': 'mangrove island',
    'T.ISLS': 'islands',
    'T.ISLT': 'land-tied island',
    'T.ISLX': 'section of island',
    'T.ISTH': 'isthmus',
    'T.KRST': 'karst area',
    'T.LAVA': 'lava area',
    'T.LEV': 'levee',
    'T.MESA': 'mesa(s)',
    'T.MND': 'mound(s)',
    'T.MRN': 'moraine',
    'T.MT': 'mountain',
    'T.MTS': 'mountains',
    'T.NKM': 'meander neck',
    'T.NTK': 'nunatak',
    'T.NTKS': 'nunataks',
    'T.PAN': 'pan',
    'T.PANS': 'pans',
    'T.PASS': 'pass',
    'T.PEN': 'peninsula',
    'T.PENX': 'section of peninsula',
    'T.PK': 'peak',
    'T.PKS': 'peaks',
    'T.PLAT': 'plateau',
    'T.PLATX': 'section of plateau',
    'T.PLDR': 'polder',
    'T.PLN': 'plain(s)',
    'T.PLNX': 'section of plain',
    'T.PROM': 'promontory(-ies)',
    'T.PT': 'point',
    'T.PTS': 'points',
    'T.RDGB': 'beach ridge',
    'T.RDGE': 'ridge(s)',
    'T.REG': 'stony desert',
    'T.RK': 'rock',
    'T.RKFL': 'rockfall',
    'T.RKS': 'rocks',
    'T.SAND': 'sand area',
    'T.SBED': 'dry stream bed',
    'T.SCRP': 'escarpment',
    'T.SDL': 'saddle',
    'T.SHOR': 'shore',
    'T.SINK': 'sinkhole',
    'T.SLID': 'slide',
    'T.SLP': 'slope(s)',
    'T.SPIT': 'spit',
    'T.SPUR': 'spur(s)',
    'T.TAL': 'talus slope',
    'T.TRGD': 'interdune trough(s)',
    'T.TRR': 'terrace',
    'T.UPLD': 'upland',
    'T.VAL': 'valley',
    'T.VALG': 'hanging valley',
    'T.VALS': 'valleys',
    'T.VALX': 'section of valley',
    'T.VLC': 'volcano',
    'U.APNU': 'apron',
    'U.ARCU': 'arch',
    'U.ARRU': 'arrugado',
    'U.BDLU': 'borderland',
    'U.BKSU': 'banks',
    'U.BNKU': 'bank',
    'U.BSNU': 'basin',
    'U.CDAU': 'cordillera',
    'U.CNSU': 'canyons',
    'U.CNYU': 'canyon',
    'U.CRSU': 'continental rise',
    'U.DEPU': 'deep',
    'U.EDGU': 'shelf edge',
    'U.ESCU': 'escarpment (or scarp)',
    'U.FANU': 'fan',
    'U.FLTU': 'flat',
    'U.FRZU': 'fracture zone',
    'U.FURU': 'furrow',
    'U.GAPU': 'gap',
    'U.GLYU': 'gully',
    'U.HLLU': 'hill',
    'U.HLSU': 'hills',
    'U.HOLU': 'hole',
    'U.KNLU': 'knoll',
    'U.KNSU': 'knolls',
    'U.LDGU': 'ledge',
    'U.LEVU': 'levee',
    'U.MESU': 'mesa',
    'U.MNDU': 'mound',
    'U.MOTU': 'moat',
    'U.MTU': 'mountain',
    'U.PKSU': 'peaks',
    'U.PKU': 'peak',
    'U.PLNU': 'plain',
    'U.PLTU': 'plateau',
    'U.PNLU': 'pinnacle',
    'U.PRVU': 'province',
    'U.RDGU': 'ridge',
    'U.RDSU': 'ridges',
    'U.RFSU': 'reefs',
    'U.RFU': 'reef',
    'U.RISU': 'rise',
    'U.SCNU': 'seachannel',
    'U.SCSU': 'seachannels',
    'U.SDLU': 'saddle',
    'U.SHFU': 'shelf',
    'U.SHLU': 'shoal',
    'U.SHSU': 'shoals',
    'U.SHVU': 'shelf valley',
    'U.SILU': 'sill',
    'U.SLPU': 'slope',
    'U.SMSU': 'seamounts',
    'U.SMU': 'seamount',
    'U.SPRU': 'spur',
    'U.TERU': 'terrace',
    'U.TMSU': 'tablemounts (or guyots)',
    'U.TMTU': 'tablemount (or guyot)',
    'U.TNGU': 'tongue',
    'U.TRGU': 'trough',
    'U.TRNU': 'trench',
    'U.VALU': 'valley',
    'U.VLSU': 'valleys',
    'V.BUSH': 'bush(es)',
    'V.CULT': 'cultivated area',
    'V.FRST': 'forest(s)',
    'V.FRSTF': 'fossilized forest',
    'V.GRSLD': 'grassland',
    'V.GRVC': 'coconut grove',
    'V.GRVO': 'olive grove',
    'V.GRVP': 'palm grove',
    'V.GRVPN': 'pine grove',
    'V.HTH': 'heath',
    'V.MDW': 'meadow',
    'V.OCH': 'orchard(s)',
    'V.SCRB': 'scrubland',
    'V.TREE': 'tree(s)',
    'V.TUND': 'tundra',
    'V.VIN': 'vineyard',
    'V.VINS': 'vineyards',
    'X.POS': 'position'
};

const GEONAME_CLASS_DESCRIPTION = {
    'A': 'country, state, region,...',
    'H': 'stream, lake, ...',
    'L': 'parks,area, ...',
    'P': 'city, village,...',
    'R': 'road, railroad',
    'S': 'spot, building, farm',
    'T': 'mountain,hill,rock,... ',
    'U': 'U undersea',
    'V': 'forest,heath,...'
};

const GEONAME_CLASS_DESCRIPTION_SHORT = {
    'A': 'Administrative',
    'H': 'Waterbody',
    'L': 'Landuse',
    'P': 'Populated Place',
    'R': 'Road, Railroad',
    'S': 'Spot',
    'T': 'Terrain',
    'U': 'Undersea',
    'V': 'Vegetation',
    'X': 'Position'
};

// endregion


export class Geoname extends DataItem {
    constructor(
        public id: number,
        public name: string,
        public searchresultname: string,
        public feature_class: string,
        public feature_code: string,
        public country: string,
        public admin1: string,
        public admin2: string,
        public population: number,
        public position: Position2d,
        public elevation: Length
    ) {
        super();
    }


    public static createFromPosition(position: Position2d): Geoname {
        const name = StringnumberHelper.getDecString(position, 4);
        return new Geoname(
            -1,
            name,
            name,
            'X',
            'POS',
            '',
            '',
            '',
            0,
            position,
            Length.createZero()
        );
    }


    public get dataItemType(): DataItemType {
        return DataItemType.geoname;
    }


    public getClassDescription(): string {
        return GEONAME_CLASS_DESCRIPTION_SHORT[this.feature_class];
    }


    public getFeatureDescription(): string {
        const desc = GEONAME_FEATURE_DESCRIPTION[this.feature_class + '.' + this.feature_code];
        return StringnumberHelper.capitalize(desc);
    }
}
