import { useMutation } from "@tanstack/react-query";

import { sendMessage } from "../api/chat";

export function useChat() {

    return useMutation({

        mutationFn: sendMessage,

    });

}