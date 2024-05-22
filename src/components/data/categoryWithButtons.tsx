import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import LoginForm from "components/form/authForm";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginGetAccessToken } from "services/auth/checkAccount";
import { exportMasterData, importMasterData } from "services/excel/excel_services";
import color from "styles/enums/color";

const CategoryWithButton = (props: {
  category: string;
  tempateEndpoint?: string;
  masterDataEndpoint?: string;
  uploadEndpoint?: string;
}) => {
  const { category, tempateEndpoint, masterDataEndpoint, uploadEndpoint } = props;
  const [showUploadMixerCatInput, setShowUploadMixerCatInput] = useState(false);

  const [uploadFile, setUploadFile] = useState<any>();

  const [openLoginForm, setOpenLoginForm] = useState(false);

  return (
    <div className="flex flex-col gap-[24px]">
      <div
        style={{
          width: "100%",
          border: "1px solid black",
          borderRadius: "4px",
          backgroundColor: color.lightBlue,
          padding: "12px",
        }}
      >
        <h1
          style={{
            color: color.white,
          }}
        >
          {category}
        </h1>
      </div>
      <div className="flex gap-[32px]">
        {/* {tempateEndpoint && (
          <Button
            size="large"
            style={{ backgroundColor: color.peachOrange }}
            onClick={() => {
              exportMasterData(tempateEndpoint, `${category} Template`);
            }}
          >
            Download template
          </Button>
        )} */}
        {masterDataEndpoint && (
          <Button
            size="large"
            style={{ backgroundColor: color.peachOrange }}
            onClick={() => {
              exportMasterData(masterDataEndpoint, category);
            }}
          >
            Get master data
          </Button>
        )}
        {uploadEndpoint && (
          <Upload
            accept=".xlsx"
            // action={uploadEndpoint}
            // onChange={(info) => {
            //   setShowUploadMixerCatInput(true);
            //   const { status } = info.file;
            //   if (status === "done") {
            //     message.success(`${info.file.name} file uploaded successfully.`);
            //     setShowUploadMixerCatInput(false);
            //   } else if (status === "error") {
            //     message.error(`${info.file.name} file upload failed.`);
            //     setShowUploadMixerCatInput(false);
            //   }
            // }}
            maxCount={1}
            showUploadList={showUploadMixerCatInput}
            beforeUpload={(file) => {
              setUploadFile(file);
              setOpenLoginForm(true);
              return false;
            }}
          >
            <Button
              icon={<UploadOutlined rev={undefined} />}
              size="large"
              style={{ backgroundColor: color.peachOrange }}
              disabled={showUploadMixerCatInput}
            >
              Upload Master Data
            </Button>
          </Upload>
        )}
      </div>
      <LoginForm
        onSubmitted={(username: string, password: string) => {
          setOpenLoginForm(false);
          loginGetAccessToken(username, password).then((token) => {
            if (token === null) {
              toast.error("Login failed");
              return;
            }
            if (uploadFile === null) return;

            if (uploadEndpoint === undefined) return;
            importMasterData(uploadEndpoint, uploadFile, token);
          });
          return true;
        }}
        open={openLoginForm}
        setModalOpen={setOpenLoginForm}
      />
    </div>
  );
};

export default CategoryWithButton;
