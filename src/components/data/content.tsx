import Endpoints from "utilities/enums/Endpoint";
import CategoryWithButton from "./categoryWithButtons";

const MasterDataContent = () => {
  return (
    <div className="flex flex-col gap-[24px]">
      {/* <CategoryWithButton
        category="Mixer Cat Input"
        masterDataEndpoint={Endpoints.EXCEL.MIXER_CAT_INPUT}
        uploadEndpoint={Endpoints.EXCEL.MIXER_CAT_INPUT}
      /> */}
      <CategoryWithButton
        category="Product Code Input"
        masterDataEndpoint={Endpoints.EXCEL.PRODUCT_CODE_INPUT}
        uploadEndpoint={Endpoints.EXCEL.PRODUCT_CODE_INPUT}
      />
      <CategoryWithButton
        category="Mixer Weight"
        tempateEndpoint={Endpoints.EXCEL.MIXER_WEIGHT_TEMPLATE}
        masterDataEndpoint={Endpoints.EXCEL.MIXER_WEIGHT}
        uploadEndpoint={Endpoints.EXCEL.MIXER_WEIGHT}
      />
      {/* <CategoryWithButton
        category="Mixer"
        masterDataEndpoint={Endpoints.EXCEL.MIXER}
        uploadEndpoint={Endpoints.EXCEL.MIXER}
      /> */}
      <CategoryWithButton
        category="Input"
        masterDataEndpoint={Endpoints.EXCEL.INPUT}
        uploadEndpoint={Endpoints.EXCEL.INPUT}
      />
      <CategoryWithButton
        category="Input pH"
        masterDataEndpoint={Endpoints.EXCEL.INPUT_PH}
        uploadEndpoint={Endpoints.EXCEL.INPUT_PH}
      />
      {/* <CategoryWithButton
        category="Category"
        masterDataEndpoint={Endpoints.EXCEL.CATEGORY}
        uploadEndpoint={Endpoints.EXCEL.CATEGORY}
      /> */}
      <CategoryWithButton
        category="Lost BCT Standard"
        uploadEndpoint={Endpoints.EXCEL.LOST_BCT}
        masterDataEndpoint={Endpoints.EXCEL.LOST_BCT_STANDARD_DATA}
      />
      {/* TODO: CHECK IF bellow function suppose to be here */}
      <CategoryWithButton
        category="Standard OPE Data"
        masterDataEndpoint={Endpoints.EXCEL.STANDARD_OPE_DATA}
        uploadEndpoint={Endpoints.EXCEL.STANDARD_OPE_DATA}
      />
      <CategoryWithButton
        category="Safezone Data"
        masterDataEndpoint={Endpoints.EXCEL.SAFEZONE_DATA}
        uploadEndpoint={Endpoints.EXCEL.SAFEZONE_DATA}
      />
      <CategoryWithButton
        category="Step Name Data"
        masterDataEndpoint={Endpoints.EXCEL.STEP_NAME_DATA}
        uploadEndpoint={Endpoints.EXCEL.STEP_NAME_DATA}
      />
    </div>
  );
};

export default MasterDataContent;
