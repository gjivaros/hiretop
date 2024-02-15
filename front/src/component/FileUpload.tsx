
import { FormControl, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { FiFile } from "react-icons/fi";

interface FileUploadProps {
  name: string
  placeholder: string
  acceptedFileTypes: string
}
export function FileUpload({ name, placeholder, acceptedFileTypes, }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);


  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={FiFile} />}
        />
        <input type='file' accept={acceptedFileTypes} name={name} ref={inputRef} style={{ display: 'none' }} />
        <Input
          placeholder={placeholder || "Your file ..."}
          onClick={() => inputRef.current && inputRef.current.click()}
          value={inputRef.current?.value}
        />
      </InputGroup>

    </FormControl>
  );
}


