import {useForm} from "react-hook-form";
import styled, {useTheme} from "styled-components";
import {InputRadioGroup, InputText,} from "../LV2/Inputs";
import {Button} from "../LV2/Button";
import {Card} from "../LV2/Card";
import FeatureJobCard from "./common/cards/FeatureJobCard";
import WorkPlaceCard from "./common/cards/WorkPlaceCard";
import {FaGrinWink} from "react-icons/fa";
import {colors, Image, Text, Title} from "../LV1";
import TestimonialCard from "./common/cards/TestimonialCard";
import BookmarkCard from "./common/cards/BookmarkCard";
import {AutoCompleteMultiple} from "../LV2/Inputs/AutoCompleteMultiple";
import ReactSelectMultiple from "../LV2/Inputs/ReactSelectDropdown";
import ReactSelectDropDown from "../LV2/Inputs/ReactSelectDropdown";
import {
    useCreateProductMutation,
    useDeleteProductMutation,
    useFetchProductsQuery,
    useUpdateProductMutation,
} from "@/store/modules/fakeStore/storeModule";
import {useEffect, useState} from "react";
import {Swiper} from "../LV2/Swiper";
import {SwiperSlide} from "swiper/react";
import Modal from "../LV2/Modal/Modal";
import Dialog from "../LV2/Modal/Dialog_";
import Spinner from "../LV2/Loader/spinner";

const Example = () => {
    // console.log(queryString);

    const theme = useTheme();
    const {control, watch} = useForm();
    const [isModalShown, setIsModalShown] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [nextStep, setNextStep] = useState(false);

    const handleTogglePass = () => {
        setShowPass(!showPass);
    };

    const handleShowModal = () => {
        setIsModalShown(true);
    };

    const handleHideModal = () => {
        setIsModalShown(false);
    };

    const autoCompleteOptions = [
        {id: 1, name: "Wade Cooper"},
        {id: 2, name: "Arlene Mccoy"},
        {id: 3, name: "Devon Webb"},
        {id: 4, name: "Tom Cook"},
        {id: 5, name: "Tanya Fox"},
        {id: 6, name: "Hellen Schmidt"},
    ];

    const selectOption = [
        {name: "Wade Cooper"},
        {name: "Arlene Mccoy"},
        {name: "Devon Webb"},
        {name: "Tom Cook"},
        {name: "Tanya Fox"},
        {name: "Hellen Schmidt"},
    ];

    const radioOption = [
        {label: "General", value: "general"},
        {label: "Specific", value: "specific"},
    ];

    const watchTextInput = watch("test");
    const watchInputSelect = watch("test-select");
    const watchAutoComplete = watch("test-auto");
    const watchCheckbox = watch("test-checkbox");
    const watchRadio = watch("test-radio");
    const watchDatePicker = watch("test-datePicker");
    const watchFoods = watch("foods");

    console.log("text-input", watchTextInput);
    console.log("input-select", watchInputSelect);
    console.log("auto-complete", watchAutoComplete);
    console.log("checkbox", watchCheckbox);
    console.log("radio", watchRadio);
    console.log("radio", watchDatePicker);
    console.log("watchFoods", watchFoods);

    const onChangeDate = (data) => {
        console.log(data);
    };
    // console.log(watchTextInput);
    // console.log(watchInputSelect);
    // console.log(watchAutoComplete);

    const dummy_input_select_multi_options = [
        {
            name: "Post Externally",
            _id: "Post Externally",
        },
        {
            name: "Post Internally",
            _id: "Post Internally",
        },
    ];

    const {
        isLoading: productsLoading,
        isError: productsIsError,
        error: productsError,
        data: products,
    } = useFetchProductsQuery({limit: 5}); // fetch

    const [createProduct, {isLoading, isError, error, isSuccess}] =
        useCreateProductMutation(); // create

    const [updateProduct] = useUpdateProductMutation(); // update

    const [deleteProduct] = useDeleteProductMutation();

    console.log("products", products);
    console.log("productsLoading", productsLoading);

    // calling createProduct dispatch function
    // useEffect(() => {
    //   const timer = setTimeout(async () => {
    //     //get custom response and api response after post request
    //     const res = await createProduct({
    //       product: {
    //         title: "test product",
    //         price: 13.5,
    //         description: "lorem ipsum set",
    //         image: "https://i.pravatar.cc",
    //         category: "electronic",
    //       },
    //     });
    //     console.log(res);
    //   }, 2000);

    //   return () => clearTimeout(timer);
    // }, []);

    // calling updateProduct dispatch function
    // useEffect(() => {
    //   const timer = setTimeout(async () => {
    //     //get custom response and api response after post request
    //     const res = await updateProduct({
    //       id: 7,
    //       newProduct: {
    //         title: "test product",
    //         price: 13.5,
    //         description: "lorem ipsum set",
    //         image: "https://i.pravatar.cc",
    //         category: "electronic",
    //       },
    //     });
    //     console.log(res);
    //   }, 5000);

    //   return () => clearTimeout(timer);
    // }, []);

    // calling deleteProduct dispatch function
    // useEffect(() => {
    //   const timer = setTimeout(async () => {
    //     const res = await deleteProduct({
    //       id: 6,
    //     });
    //     console.log(res);
    //   }, 8000);

    //   return () => clearTimeout(timer);
    // }, []);

    // console.log("env v", process.env.JUNCTURE_BACKEND);

    const options = [
        {value: "Graphic Designer", label: "Graphic Designer"},
        {value: "Office Staff", label: "Office Staff"},
        {value: "Android developer", label: "Android developer"},
    ];

    const appType = watch("application_type");

    useEffect(() => {
        if (appType === "specific") {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [appType]);

    const initialFiles = [
        // {
        //   name: "Resume.pdf",
        //   size: "3124",
        //   id: "23423452435634",
        // },
        // {
        //   name: "Records.pdf",
        //   size: "3224",
        //   id: "2342334234634",
        // },
    ];

    const [selectedFile, setSelectedFile] = useState(initialFiles);
    const [selectedID, setSelectedID] = useState("");
    const [progress, setProgress] = useState(0);

    const handleFileInputChange = (event) => {
        setTimeout(() => {
            setProgress(100);
        }, 3000);
        const file = event.target.files[0];
        const fileName = {
            name: file?.name,
            size: file?.size,
            id: file?.lastModified,
        };
        setSelectedID(fileName.id);
        setSelectedFile((p) => [fileName, ...p]);
        setTimeout(() => {
            setProgress(0);
        }, 4500);
    };

    const progressStyles = {
        backgroundColor: theme.blue200,
        height: "100%",
        width: `${progress}%`,
        transition: "width 0.2s ease-in",
    };

    return (
        <section className="flex flex-col w-[1280px] min-h-screen mx-auto py-10 space-x-4 space-y-8">
            <Button href="/">Go Home</Button>

            <div className="w-[610px] self-center border-2  rounded-lg flex flex-col">
                <div className="flex justify-between items-center py-2 px-4">
                    <Text size="lg">Prior Request</Text>
                    <Image imageType="close" width="16"/>
                </div>
                <div className=" flex flex-col space-y-4 border border-l-transparent border-r-transparent p-5">
                    <div className="flex items-center self-center">
                        <Image
                            imageType={nextStep ? "completed" : "undone"}
                            fillColor={nextStep ? theme.primary : theme.white}
                        />
                        <hr
                            style={{
                                backgroundColor: nextStep ? theme.primary : theme.neutral400,
                                width: 150,
                                height: 1,
                            }}
                        />
                        <Image
                            imageType={nextStep ? "undone" : "circle"}
                            fillColor={theme.white}
                        />
                    </div>
                    {nextStep ? (
                        <div className="flex flex-col space-y-4">
                            <Text size="lg" weight="xxl">
                                Select CV
                            </Text>
                            {selectedFile?.length > 0 && (
                                <>
                                    <div className="border rounded-lg p-2">
                                        {selectedFile.map((file, i) => (
                                            <div
                                                key={i}
                                                className="rounded-lg  p-2 flex justify-between items-center"
                                            >
                                                <div className="flex space-x-2">
                                                    <div className="border border-slate-300 rounded-lg px-2">
                                                        <Image imageType="document" width="18"/>
                                                    </div>
                                                    <div className="">
                                                        <Text>{file.name}</Text>
                                                        <Text weight="xs" color="neutral400" size="xs">
                                                            {file.size}KB
                                                        </Text>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            selectedID === file.id ? theme.green150 : "",
                                                    }}
                                                    className="border py-1 cursor-pointer px-4 rounded-lg "
                                                    onClick={() => {
                                                        setSelectedID(file.id);
                                                    }}
                                                >
                                                    {selectedID === file.id ? (
                                                        <div className="flex items-center space-x-1">
                                                            <Image
                                                                imageType="correct"
                                                                width={18}
                                                                height={18}
                                                            />
                                                            <Text>Selected</Text>
                                                        </div>
                                                    ) : (
                                                        <Text>Select</Text>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Text className="text-center">or</Text>
                                </>
                            )}
                            <div
                                className="relative border border-dashed rounded-lg py-6 flex flex-col items-center overflow-hidden">
                                <div
                                    style={progressStyles}
                                    className="absolute top-0 left-0 w-full h-full -z-10 transition-all"
                                />
                                <Button bgcolor={theme.blue80} as="label">
                                    <input
                                        type="file"
                                        onChange={handleFileInputChange}
                                        accept=".doc,.docx,.pdf,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        hidden
                                    />
                                    <Text color="blue450"> Upload CV</Text>
                                </Button>
                                <Text color="neutral400">.doc, .docx, .pdf (2MB)</Text>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-4 ">
                            <Text size="lg" weight="xxl">
                                Type of Application
                            </Text>
                            <HorizontalRadioChecks>
                                <InputRadioGroup
                                    style={{display: "flex"}}
                                    control={control}
                                    name="application_type"
                                    options={radioOption}
                                    error="error"
                                />
                            </HorizontalRadioChecks>
                            <div>
                                <Text>
                                    Job Title <span className="required">*</span>
                                </Text>
                                <ReactSelectDropDown
                                    control={control}
                                    name="jobTitle"
                                    options={options}
                                    disabled={isDisabled}
                                />
                            </div>
                            <div className="flex flex-col space-y-4">
                                <Text size="lg" weight="xxl">
                                    Personal Info
                                </Text>
                                <div className="items-center">
                                    <Text>
                                        Email<span className="required">*</span>
                                    </Text>
                                    <InputText
                                        placeholder="Enter Your Email"
                                        control={control}
                                        name="email"
                                        // error={errors?.email?.message}
                                        width="296px"
                                    />
                                </div>
                                <div className="items-center">
                                    <Text>
                                        Password<span className="required">*</span>
                                    </Text>
                                    <InputText
                                        placeholder="Enter Your Password"
                                        control={control}
                                        name="password"
                                        // error={errors?.password?.message}
                                        width="296px"
                                        type={showPass ? "text" : "password"}
                                        onClick={handleTogglePass}
                                        showPass={showPass}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex self-end space-x-2 px-4 py-2">
                    <Button size="md" type="button" variant="outlined">
                        Cancel
                    </Button>
                    <Button size="md" type="button" onClick={() => setNextStep(true)}>
                        {nextStep ? "Submit" : "Continue"}
                    </Button>
                </div>
            </div>

            <div className="w-[300px]">
                <ReactSelectMultiple control={control} name="foods" options={options}/>
            </div>

            <div className="flex items-start gap-7 flex-wrap py-10">
                {allIcons.map((icon, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-4 items-center justify-center"
                    >
                        <Image
                            imageType={icon}
                            width={22}
                            height={22}
                            color={theme.primary}
                            fillColor={theme.primary}
                        />
                        <Text>{icon}</Text>
                    </div>
                ))}
            </div>

            <Spinner/>
            <div className="flex items-start flex-wrap space-x-5 pt-10">
                <Button size="sm" bgcolor={theme.amber200} textcolor={theme.black}>
                    button
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    bgcolor={theme.amber200}
                    textcolor={theme.black}
                >
                    button
                </Button>
                <Button size="md" variant="outlined">
                    button
                </Button>
                <Button
                    size="md"
                    variant="outlined"
                    bordercolor={theme.neutral400}
                    textcolor={theme.neutral600}
                >
                    button
                </Button>
                <Button size="lg">button</Button>

                <Button size="sm">button sm</Button>
                <Button size="md">button md default</Button>
                <Button size="lg">button lg</Button>
                <Button isDisabled>disabled button</Button>

                <Button
                    startIcon={<Image imageType="loading" width={20} height={20}/>}
                >
                    loading start Icon button
                </Button>

                <Button endIcon={<FaGrinWink/>}>end Icon button</Button>
            </div>

            <div className="w-96 pb-10">
                <Button fullWidth isLoading>
                    fullWidth button
                </Button>
            </div>

            <Card>test card</Card>
            <div className="flex items-start gap-2">
                <Card width={400}>
                    <div className="space-y-3">
                        <Title mb="5">Title</Title>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                            animi labore est, ipsam rem eius molestias magni inventore sint
                            possimus nihil suscipit at deleniti aliquid eos officiis illum
                            dicta explicabo id quas, vero ea, officia asperiores.
                            Reprehenderit, temporibus sunt? Rem?
                        </Text>
                    </div>
                </Card>
                <Card width={200} bgcolor={theme.neutral300}>
                    <div className="space-y-3">
                        <Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                            animi labore est.
                        </Text>
                    </div>
                </Card>
            </div>

            <div className="py-8 space-x-4">
                <FeatureJobCard
                    logoImg="/images/yoda.jpg"
                    title="Third Party Information"
                    subTitle="CITIBANK"
                    place="Yangon"
                    level="Entry Level"
                    time="Full Time"
                    route="/"
                    tags={featureJobCardTags}
                />

                <WorkPlaceCard
                    logoImg="/images/yoda.jpg"
                    title="Netflix"
                    icons={["location", "folder", "filter", "bookmark"]}
                    route="/"
                />

                <TestimonialCard
                    logoImg="/images/yoda.jpg"
                    name="john terry"
                    job="assotiate talent"
                />
            </div>

            <div className="">
                <BookmarkCard
                    logoImg="/images/yoda.jpg"
                    title="Third Party Information Security Assessor"
                    subTitle="CITIBANK"
                    place="Yangon"
                    tags={bookmarkCardTags}
                />
            </div>

            <div className="pb-20">
                <Swiper>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((el, index) => (
                        <SwiperSlide>
                            <div className="w-60 h-40 bg-rose-300">Slide {el}</div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <Modal open={isModalShown} onClose={handleHideModal}>
                <Dialog
                    title="Confirm Delete"
                    description="Are you sure you want to delete"
                    onClose={handleHideModal}
                />
            </Modal>

            <button
                className="bg-blue-800 py-1 px-4 rounded text-white"
                onClick={handleShowModal}
            >
                Show Modal
            </button>

            {/* <div className="flex gap-10 flex-wrap">
        <div className="w-[300px]">
          <InputText
            placeholder="test"
            control={control}
            name="test"
            // error="error"
          />
        </div>
        <div className="w-[300px]">
          <AutoComplete
            options={autoCompleteOptions}
            name="test-auto"
            control={control}
            // error="error"
          />
        </div>
        <div className="w-[300px]">
          <InputSelect
            options={selectOption}
            control={control}
            name="test-select"
            // error="error"
          />
        </div>
        <CheckBox label="Test" name="test-checkbox" control={control} />

        <div className="w-[300px]">
          <InputRadioGroup
            control={control}
            name="test-radio"
            options={radioOption}
            error="error"
          />
        </div>
        <div className="w-[300px]">
          <DatePickerInput
            control={control}
            name="test-datepicker"
            onChange={onChangeDate}
          />
        </div>

        <div className="w-[300px]">
          <InputTextArea control={control} name="test-textarea" />
        </div>
      </div> */}

            {/* <InputText placeholder="test" control={control} name="test" />
      <AutoComplete
        options={autoCompleteOptions}
        name="test-auto"
        control={control}
      />
      <InputSelect
        options={selectOption}
        control={control}
        name="test-select"
      />
      <CheckBox label="Test" control={control} /> */}

            <div className="w-[300px]">
                <AutoCompleteMultiple
                    options={autoCompleteOptions}
                    name="test-auto"
                    control={control}
                    // error="error"
                />
            </div>
            <div className="w-[300px]">
                <AutoCompleteMultiple
                    options={dummy_input_select_multi_options}
                    name="test-select"
                    control={control}
                    // error="error"
                />
            </div>
        </section>
    );
};

export default Example;

const HorizontalRadioChecks = styled.div`
  & > div {
    margin-top: 5px;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 17px;
  }

  & > input {
    color: ${(props) => props.theme.blue400} !important;
    border: 1px solid ${(props) => props.theme.blue400} !important;
  }
`;

const allIcons = [
    "filter",
    "loading",
    "folder",
    "location",
    "bookmark",
    "greaterThan",
    "aeroplane",
    "designService",
    "accountCircle",
    "emergency",
    "carShipping",
    "movie",
    "accountBalance",
    "bolt",
    "facebook",
    "linkedIn",
    "twitter",
    "instagram",
    'mapPointer',
    'list',
];

const featureJobCardTags = [
    {text: "Entry Level", bgcolor: colors.sky300},
    {text: "Full Time", bgcolor: colors.amber200},
];

const bookmarkCardTags = [
    {text: "Mid-Level", bgcolor: colors.sky300},
    {text: "On-Site", bgcolor: colors.green300},
    {text: "Contract", bgcolor: colors.amber200},
];
