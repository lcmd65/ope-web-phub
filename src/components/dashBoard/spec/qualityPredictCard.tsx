import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { startPumpByMixer } from "services/pump/pumpService";
import color from "styles/enums/color";
import { IBatchResult } from "types/response/dashboard/IBatchResultResponse";
import { IBatchUncertain } from "types/response/dashboard/IBatchUncertain";
import BatchUncertain from "./batchUncertain";
import MaterialSpecTable from "./materialSpecTable";
import PredictTable from "./predictTable";

const QualityPredictCard = (props: {
  batchResult?: IBatchResult;
  batchUncertain?: IBatchUncertain;
  mixer_id: string;
  is_pump_running?: boolean;
}) => {
  const { batchResult, batchUncertain, is_pump_running } = props;
  const [open, setOpen] = useState(false);
  const batchUncertainPercent =
    ((batchUncertain?.total_predict_pass ?? 0) / (batchUncertain?.total_predict ?? 1)) * 100;
  const handleOnSubmit = async () => {
    const res = await startPumpByMixer(props.mixer_id);
    if (res.data == null) {
      toast.error("Mixer's pump is disabled!");
    } else {
      toast.success("Pump start successfully!");
    }
    setOpen(false);
  };
  return (
    // <div className="w-full">
    <div
      style={{
        paddingTop: 12,
        paddingLeft: 24,
        paddingRight: 24,
        background: color.white,
        width: "100%",
      }}
      className="flex flex-col items-center"
    >
      <div style={{ background: color.white, paddingBottom: "4px" }} className="flex flex-col items-center w-full">
        <h1 style={{ color: color.black }} className="mb-2">
          Quality Prediction
        </h1>

        <PredictTable predict={batchResult?.predict} specData={batchResult?.spec_data} />
        <div className="relative flex items-center justify-center w-full mt-4 mb-3">
          <h1 style={{ color: color.black }} className="flex justify-center w-full gap-2">
            Pump status:
            {is_pump_running != undefined ? (
              is_pump_running == true ? (
                <p className="text-green-500">Unlocked</p>
              ) : (
                <p className="text-red-500">Locked</p>
              )
            ) : (
              <p>Not Found</p>
            )}
          </h1>
          <Button
            style={{
              backgroundColor: color.primary,
              color: color.white,
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              margin: "auto 0",
            }}
            size="large"
            onClick={() => setOpen(true)}
          >
            Start Pump
          </Button>

          <Modal
            open={open}
            onCancel={() => setOpen(false)}
            footer={
              <Button onClick={handleOnSubmit} size="large">
                Submit
              </Button>
            }
            centered
          >
            <Form layout="vertical" size="large" name="form_in_modal">
              <Form.Item name="Username" label="Username">
                <Input size="large" />
              </Form.Item>
              <Form.Item name="Password" label="Password">
                <Input size="large" type="password" />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div className="items-center justify-center w-full py-1">
          {/* <Divider></Divider> */}
          <div
            className="my-1"
            style={{
              width: "100%",
              height: "1px",
              background: color.divider,
            }}
          ></div>
          <h1 className="flex justify-center my-2">Uncertain Batches</h1>
          <div>
            <BatchNoUncertainLegend />
            <BatchUncertain batchUncertain={batchUncertain} />
          </div>
        </div>
        <h1 style={{ color: color.black, marginTop: "4px" }}>Material Spec</h1>
        <div
          className="my-1"
          style={{
            width: "100%",
            height: "1px",
            background: color.divider,
          }}
        ></div>
        {<MaterialSpecTable materialSpecData={batchResult?.material_spec_data} />}
      </div>
    </div>
    // </div>
  );
};

export default QualityPredictCard;

const BatchNoUncertainLegend = () => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center pl-10">
        <div
          className="w-[20px] h-[20px] rounded-full"
          style={{
            backgroundColor: color.error,
          }}
        ></div>
        <h2 className="ml-[8px]">Uncertain</h2>
      </div>

      <div className="flex items-center pl-10">
        <div
          className="w-[20px] h-[20px] rounded-full"
          style={{
            backgroundColor: color.green,
          }}
        ></div>
        <h2 className="ml-[8px]">Certain Pass</h2>
      </div>
    </div>
  );
};
